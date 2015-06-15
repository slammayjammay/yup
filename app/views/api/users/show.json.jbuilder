json.extract! @user, :id, :first_name, :last_name, :email, :image_url, :reviews,
  :followers, :follows

following = @user.followings.where(follower_id: current_user.id)
json.follow_id following.first.id unless following.first.nil?
