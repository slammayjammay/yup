categories = %w(tech, food, business, sports, recreational)

20.times do
  Business.create!(
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
