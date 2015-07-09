images = [
  "https://s-media-cache-ak0.pinimg.com/736x/19/1a/21/191a21be2a2c3ab99735485a6513f9ed.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Eureka,_California_Storefront.jpg/640px-Eureka,_California_Storefront.jpg",
  "https://redbeacon.s3.amazonaws.com/skillsprofile_work%2F23392%2FCommercial+SF+2.jpg.jpg",
  "http://hdwpics.com/images/2C7514508802/Spandrel-Glass-Storefront-White-With-Insulated-Glass.jpg",
  "https://s-media-cache-ak0.pinimg.com/736x/5c/29/71/5c297155e34b003355b43b78f1b9d8e3.jpg",
  "http://storm-electric.com/wp-content/uploads/2011/10/storefronts2-692x304.jpg",
  "http://s3-media1.fl.yelpcdn.com/bphoto/xLX4_pR93wKBrskSlme8rQ/o.jpg"
]
categories = %w(restaurants food nightlife shopping bars coffee health pets)
categories.each do |category|
  10.times do |offset|
    params = { category_filter: category, limit: 20, offset: 20 * offset }
    results = Yelp.client.search('San Francisco', params)

    20.times do |num|
      business = results.businesses[num]
      if business.respond_to?(:phone) && business.location.respond_to?(:coordinate)
        address = business.location.display_address
        if address.length == 2
          address_line_1 = address[0]
        else
          address_line_1 = address[0..1].join(' ')
        end
        address_line_2 = address[-1]

        Business.create!(
          name: business.name.downcase,
          category: category,
          address_line_1: address_line_1,
          address_line_2: address_line_2,
          city: business.location.city,
          state: business.location.country_code,
          latitude: business.location.coordinate.latitude,
          longitude: business.location.coordinate.longitude,
          phone: business.phone,
          url: business.url,
          image_url: images.sample
        )
      end
    end
  end
end

50.times do
  User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    image_url: Faker::Avatar.image,
    password_digest: BCrypt::Password.create('password'),
    session_token: User.generate_session_token
  )
end

users = User.all
user_ids = (User.first.id..User.last.id).to_a
business_ids = (Business.first.id..Business.last.id).to_a

users.each do |user|
  5.times do |num|
    Following.create!(
      follower_id: user.id,
      followed_id: user_ids.sample
    )
  end
end

2000.times do
  business = Business.find(business_ids.sample)
  rating = (1..5).to_a.sample
  content = Faker::Hacker.say_something_smart
  (0..10).to_a.sample.times do |num|
    content += " #{Faker::Hacker.say_something_smart}"
  end

  review = Review.create!(
    rating: rating,
    content: content,
    business_id: business.id,
    user_id: user_ids.sample
  )
  business.review_count += 1
  diff = rating - business.rating
  business.rating += diff.fdiv(business.review_count)
  business.save!
end

User.create!(
  first_name: 'Guest',
  last_name: 'User',
  email: 'example@email.com',
  image_url: 'http://captainkimo.com/wp-content/uploads/2012/01/Brown-Pelican-in-Winter-Plumage-Jupiter-Florida-490x326.jpg',
  password_digest: BCrypt::Password.create('password'),
  session_token: 'session_token'
)

10.times do
  content = Faker::Hacker.say_something_smart
  (0..10).to_a.sample.times do |num|
    content += " #{Faker::Hacker.say_something_smart}"
  end

  Review.create!(
    rating: (1..5).to_a.sample,
    content: content,
    business_id: business_ids.sample,
    user_id: User.last.id
  )

  Following.create!(
    follower_id: User.last.id,
    followed_id: user_ids.sample
  )
end
