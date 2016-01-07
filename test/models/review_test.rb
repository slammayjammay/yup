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

require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
