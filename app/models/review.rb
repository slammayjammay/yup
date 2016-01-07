# == Schema Information
#
# Table name: reviews
#
#  id          :integer          not null, primary key
#  rating      :float            not null
#  excerpt     :string           not null
#  business_id :string           not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Review < ActiveRecord::Base
  validates :user_id, :business_id, :rating, :excerpt, presence: true
  belongs_to :user
  belongs_to :business

  default_scope { order('created_at DESC') }
end
