json.extract! @user, :id, :name, :email, :image_url, :reviews, :followers,
  :follows

if current_user
  following = @user.followings.where(follower_id: current_user.id)
  json.follow_id following.first.id unless following.first.nil?
end
