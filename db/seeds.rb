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
# business_ids = (Business.first.id..Business.last.id).to_a

users.each do |user|
  5.times do |num|
    Following.create!(
      follower_id: user.id,
      followed_id: user_ids.sample
    )
  end
end

# 2000.times do
#   business = Business.find(business_ids.sample)
#   rating = (1..5).to_a.sample
#   content = Faker::Hacker.say_something_smart
#   (0..10).to_a.sample.times do |num|
#     content += " #{Faker::Hacker.say_something_smart}"
#   end
#
#   review = Review.create!(
#     rating: rating,
#     content: content,
#     business_id: business.id,
#     user_id: user_ids.sample
#   )
#   business.review_count += 1
#   diff = rating - business.rating
#   business.rating += diff.fdiv(business.review_count)
#   business.save!
# end

User.create(
  first_name: 'Guest',
  last_name: 'User',
  email: 'example@email.com',
  image_url: 'http://captainkimo.com/wp-content/uploads/2012/01/Brown-Pelican-in-Winter-Plumage-Jupiter-Florida-490x326.jpg',
  password_digest: BCrypt::Password.create('password'),
  session_token: 'session_token'
)

# 10.times do
#   content = Faker::Hacker.say_something_smart
#   (0..10).to_a.sample.times do |num|
#     content += " #{Faker::Hacker.say_something_smart}"
#   end
#
#   Review.create!(
#     rating: (1..5).to_a.sample,
#     content: content,
#     business_id: business_ids.sample,
#     user_id: User.last.id
#   )
#
#   Following.create!(
#     follower_id: User.last.id,
#     followed_id: user_ids.sample
#   )
# end
