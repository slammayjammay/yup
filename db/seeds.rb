# Create guest user
User.create(
  name: 'Guest User',
  email: 'example@email.com',
  image_url: 'http://captainkimo.com/wp-content/uploads/2012/01/Brown-Pelican-in-Winter-Plumage-Jupiter-Florida-490x326.jpg',
  password_digest: BCrypt::Password.create('password'),
  session_token: 'session_token'
)

sample_cats = [
  "ethiopian", "falafel", "vegan", "chocolate", "coffee", "creperies",
  "newamerican", "delis", "landmarks", "venues", "japanese", "bakeries",
  "hawaiian", "chinese", "sandwiches", "pizza", "tea", "mexican", "foodstands"
]
user_images = []
business_ids = []

sample_cats.each do |cat|
  businesses = Yelp.client.search(
    'San Francisco',
    { category_filter: cat, limit: 3, offset: rand(10) * 10 }
  ).businesses

  businesses.each do |bus|
    # Use business_ids later for sample reviews
    business_ids.push(bus.id)

    # Seed business images
    bus_data = Yelp.client.business(URLify.deaccentuate(bus.id))
    Image.create(url: bus_data.image_url)

    # Gather user images
    user_images.push(bus_data.reviews[0].user.image_url)
  end
end

# Create sample users
50.times do |n|
  User.create(
    name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
    email: Faker::Internet.email,
    image_url: user_images[n],
    password_digest: BCrypt::Password.create('password'),
    session_token: User.generate_session_token
  )
end

users = User.all
user_ids = (User.first.id..User.last.id).to_a

users.each do |user|
  # Create sample follows
  5.times do |num|
    Following.create!(
      follower_id: user.id,
      followed_id: user_ids.sample
    )
  end

  (rand(5) + 3).times do
    # Create sample reviews
    excerpt = Faker::Hacker.say_something_smart
    rand(10).times do |num|
      excerpt += " #{Faker::Hacker.say_something_smart}"
    end

    Review.create(
      rating: rand(5) + 1,
      excerpt: excerpt,
      business_id: business_ids.sample,
      user_id: user.id
    )
  end
end
