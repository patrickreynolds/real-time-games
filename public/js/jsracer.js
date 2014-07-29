$(function(){

	// ================= Kickoff ================= 
	JSRacer.start();

	var pusher = new Pusher('4f0fd90ff9f08ea1d061');
	var channelId = "jsracer-" + $('#game-container').data('gameroom')
	var channel = pusher.subscribe(channelId);

	channel.bind('move_player_1', function(data) {
	 	var player1Event = document.createEvent('Event');
	 	player1Event.keyCode = 81;
	 	player1Event.initEvent('remoteMovePlayer', true, true);
	 	document.dispatchEvent(player1Event);
	});

	channel.bind('move_player_2', function(data) {
	 	var player2event = document.createEvent('Event');
	 	player2event.keyCode = 80;
	 	player2event.initEvent('remoteMovePlayer', true, true);
	 	document.dispatchEvent(player2event);
	});
});