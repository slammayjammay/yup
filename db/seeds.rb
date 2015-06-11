categories = %w(tech food business sports recreational)

20.times do
  Business.create(
    name: Faker::Company.name,
    category: categories.sample,
    address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    phone: Faker::PhoneNumber.phone_number,
    url: Faker::Internet.url,
    image_url: Faker::Company.logo
  )
end


50.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    image_url: Faker::Company.logo,
    password_digest: "nothing",
    session_token: "nothing"
  )
end

user_ids = (User.first.id..User.last.id).to_a
business_ids = (Business.first.id..Business.last.id).to_a

100.times do
  Review.create(
    rating: (1..5).to_a.sample,
    content: Faker::Hacker.say_something_smart,
    price: (1..4).to_a.sample,
    business_id: business_ids.sample,
    user_id: user_ids.sample
  )
end
