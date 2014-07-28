enable :sessions

helpers do

	def start_session user
		session[:user_id] = user.id
		current_user
	end

	def current_user
			@current_user ||= User.find_by_id(session[:user_id])
	end

	def logged_in?
		begin
			return current_user if current_user.id == session[:user_id]
		rescue
			false
		end
	end

	def log_out
		session.clear # [:user_id] = nil
	end

	def authenticate? username, password
		user = User.find_by_username(username)
		# TODO: If user exists, check for password. 

		# TODO: If not, give warning that combination was invalid.

		# TODO: http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html
		user.password == password ? user : false
	end
end