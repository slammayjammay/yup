categories = %w(restaurants food nightlife shopping bars coffee health)
categories.each do |category|
  params = { category_filter: category, limit: 5 }
  results = Yelp.client.search('San Francisco', params)

  5.times do |num|
    Business.create(
      name: results.businesses[num].name,
      category: category,
      rating: results.businesses[num].rating,
      address: results.businesses[num].location.display_address.join(" "),
      city: results.businesses[num].location.city,
      state: results.businesses[num].location.country_code,
      # phone: results.businesses[num].phone,
      url: results.businesses[num].url,
      image_url: results.businesses[num].image_url
    )
  end
end

50.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    image_url: Faker::Company.logo,
    password_digest: "nothing",
    session_token: "nothing"
  )
end

user_ids = (User.first.id..User.last.id).to_a
business_ids = (Business.first.id..Business.last.id).to_a

100.times do
  business = Business.find(business_ids.sample)
  rating = (0..5).to_a.sample

  review = Review.create(
    rating: rating,
    content: Faker::Hacker.say_something_smart,
    business_id: business.id,
    user_id: user_ids.sample
  )
  business.review_count += 1
  diff = rating - business.rating
  business.rating += diff / business.review_count
  business.save!
end
