class User < ActiveRecord::Base
	validates :email, 		presence: true, uniqueness: true
  validates :username, 	presence: true, uniqueness: true
  validates :password, 	presence: true, langth: { minimum: 6 }
end