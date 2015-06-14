categories = %w(restaurants food nightlife shopping bars coffee health)
categories.each do |category|
  params = { category_filter: category, limit: 5 }
  results = Yelp.client.search('San Francisco', params)

  5.times do |num|
    business = results.businesses[num]
    Business.create(
      name: business.name,
      category: category,
      rating: business.rating,
      address: business.location.display_address.join(" "),
      city: business.location.city,
      state: business.location.country_code,
      latitude: business.location.coordinate.latitude,
      longitude: business.location.coordinate.longitude,
      phone: (business.phone if business.respond_to?(:phone)),
      url: business.url,
      image_url: Faker::Company.logo
    )
  end
end

50.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    image_url: Faker::Avatar.image,
    password_digest: "password",
    session_token: "password"
  )
end

users = User.all
user_ids = (User.first.id..User.last.id).to_a
business_ids = (Business.first.id..Business.last.id).to_a

users.each do |user|
  5.times do |num|
    Following.create(
      follower_id: user.id,
      followed_id: user_ids.sample
    )
  end
end

100.times do
  business = Business.find(business_ids.sample)
  rating = (0..5).to_a.sample

  review = Review.create(
    rating: rating,
    content: Faker::Lorem.paragraphs((1..4).to_a.sample),
    business_id: business.id,
    user_id: user_ids.sample
  )
  business.review_count += 1
  diff = rating - business.rating
  business.rating += diff.fdiv(business.review_count)
  business.save!
end
