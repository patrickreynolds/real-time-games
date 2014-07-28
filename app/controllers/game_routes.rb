Pusher.url = ENV['PUSHER_URL']

get '/users/:username/games/jsracer' do
	@username = current_user
	erb :jsracer
end

post '/users/:username/games/jsracer' do
	puts params
	if params[:player] == 'player1'
		Pusher["jsracer-#{ params[:username} }"].trigger('move_player_1', {})
	elsif params[:player] == 'player2'
		Pusher["jsracer-#{ params[:username] }"].trigger('move_player_2', {})
	end
end