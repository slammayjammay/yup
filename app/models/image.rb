# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Image < ActiveRecord::Base
end
