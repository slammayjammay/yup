# Create sample users
50.times do
  User.create!(
    name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
    email: Faker::Internet.email,
    image_url: Faker::Avatar.image,
    password_digest: BCrypt::Password.create('password'),
    session_token: User.generate_session_token
  )
end

# Create guest user
User.create(
  name: 'Guest User',
  email: 'example@email.com',
  image_url: 'http://captainkimo.com/wp-content/uploads/2012/01/Brown-Pelican-in-Winter-Plumage-Jupiter-Florida-490x326.jpg',
  password_digest: BCrypt::Password.create('password'),
  session_token: 'session_token'
)

# Create sample follows
users = User.all
user_ids = (User.first.id..User.last.id).to_a

users.each do |user|
  5.times do |num|
    Following.create!(
      follower_id: user.id,
      followed_id: user_ids.sample
    )
  end
end

# Sample review
Review.create(
  rating: 2,
  excerpt: 'A way a lone a last a loved a long the riverrun...',
  business_id: 'the-codmother-fish-and-chips-san-francisco',
  user_id: User.first.id
)

# Create images
sample_cats = [
  "ethiopian", "falafel", "vegan", "chocolate", "coffee", "creperies",
  "newamerican", "delis", "landmarks", "venues", "japanese", "bakeries",
  "hawaiian", "chinese", "sandwiches", "pizza", "tea", "mexican", "foodstands"
]

sample_cats.each do |cat|
  businesses = Yelp.client.search(
    'San Francisco',
    { category_filter: cat, limit: 3 }
  ).businesses

  businesses.each do |bus|
    bus_data = Yelp.client.business(URLify.deaccentuate(bus.id))
    Image.create(url: bus_data.image_url)
  end
end
