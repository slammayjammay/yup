# == Schema Information
#
# Table name: businesses
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  category   :string           not null
#  address    :string           not null
#  city       :string           not null
#  state      :string           not null
#  url        :string
#  phone      :integer
#  image_url  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Business < ActiveRecord::Base
  validates :name, :category, :address, :city, :state, presence: true
  has_many :reviews
  has_many :reviewers, through: :reviews, source: :user
end
