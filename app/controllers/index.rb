get '/' do
	@user = logged_in?
	if @user
		@username = @user.username
		redirect "/users/#{@username}"
	else
		erb :index
	end
end