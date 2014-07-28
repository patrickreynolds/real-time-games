enable :sessions

get '/logout' do
	log_out
	redirect '/'
end

get '/users/:username' do
	@user = current_user
	@username = @user.username
	erb :profile
end

post '/users/create' do
	# "POST: /:user"
	user = User.create(params)
	# TODO: Dry up with helper method
	p "User Details: "
	p user
	# TODO: This will run validations via the User model
	if user.valid?
		puts "User is valid, redirecting to /users/#{user.username}"
		start_session user
		redirect "/users/#{user.username}"
	else 
		redirect "/"
	end
end

post '/users/login' do
	user = authenticate? params[:username], params[:password]

	if user
		start_session user
		redirect "/users/#{user.username}"
	else 
		# TODO: Pass error that they were unable to login, no account found
		redirect '/'
	end
end