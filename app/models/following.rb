# == Schema Information
#
# Table name: followings
#
#  id          :integer          not null, primary key
#  follower_id :integer          not null
#  followed_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Following < ActiveRecord::Base
  validates :follower, :followed, presence: true

  belongs_to :follower, class_name: 'User', foreign_key: :follower_id
  belongs_to :followed, class_name: 'User', foreign_key: :followed_id
end
