Pusher.url = ENV['PUSHER_URL']

get '/users/:username/games/jsracer' do
	@user = current_user
	@username = @user.username
	@app_key = ENV['APP_KEY']
	erb :jsracer
end

get '/users/:username/games/simon-says' do
	@user = current_user
	@username = @user.username
	@app_key = ENV['APP_KEY']
	erb :simon_says
end

post '/users/:username/games/jsracer' do
	if params[:player] == 'player1'
		Pusher["jsracer-#{ params[:username] }"].trigger('move_player_1', {})
	elsif params[:player] == 'player2'
		Pusher["jsracer-#{ params[:username] }"].trigger('move_player_2', {})
	end
end