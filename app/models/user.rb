require 'bcrypt'

class User < ActiveRecord::Base
	include BCrypt
	validates :email, 		presence: true, uniqueness: true
  validates :username, 	presence: true, uniqueness: true
  validates :password, 	presence: true, length: { minimum: 6 }

  def password
  	@password ||= Password.new(password_hash)
  end

  def password=(new_password)
  	@password = Password.create(new_password)
  	self.password_hash = @password
  end
end