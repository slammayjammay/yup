# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  image_url       :string           default("https://s-media-cache-ak0.pinimg.com/originals/2b/ed/51/2bed513bc5f13733cf9a8a12c4e1a971.gif"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  attr_reader :password
  after_initialize :ensure_session_token

  has_many :reviews
  has_many :reviewed_businesses, through: :reviews, source: :business

  has_many :followings, foreign_key: :followed_id
  has_many :followeds, class_name: 'Following', foreign_key: :follower_id

  has_many :followers, through: :followings, source: :follower
  has_many :follows, through: :followeds, source: :followed

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
end
