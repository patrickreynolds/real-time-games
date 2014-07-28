enable :sessions

get '/logout' do
	log_out
	redirect '/'
end

get '/:username' do
	redirect "/#{params[:user]}"
end

post '/users/create' do
	# "POST: /:user"
	user = User.create(	email: params[:email],
									username: params[:username],
									password: params[:password])
	# TODO: Dry up with helper method

	# TODO: This will run validations via the User model
	if user.valid?
		start_session user
		redirect "/#{user.username}"
	else 
		redirect "/"
	end
end

post '/users/login' do
	user = authenticate? params[:username], params[:password]

	if user
		start_session user
		redirect "/#{user.username}"
	else 
		# TODO: Pass error that they were unable to login, no account found
		redirect '/'
	end
end