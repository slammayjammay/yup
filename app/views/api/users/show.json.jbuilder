json.reviews @user.reviews do |review|
  json.extract! review, :id, :excerpt, :rating, :business_id, :created_at
  json.user @user, :id, :image_url, :name
end

json.extract! @user, :id, :name, :email, :image_url, :followers,
  :follows

if current_user
  following = @user.followings.where(follower_id: current_user.id)
  json.follow_id following.first.id unless following.first.nil?
end
