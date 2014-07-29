// ================= Controller =================
var JSRacer = {

	view: new View(),

	start: function(){
		this.bindEvents();

	},
	bindEvents: function(){
		this.view.bindEvents();

	},
	bindPusherEvents: function(channel){
		// Pusher Channels
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
	},
	startRace: function(event){
		event.preventDefault();

		var pusher = new Pusher('4f0fd90ff9f08ea1d061');
		var channelId = "jsracer-" + $('#game-container').data('gameroom')
		var channel = pusher.subscribe(channelId);
		JSRacer.bindPusherEvents(channel);

		var raceInfo = this.raceInfo();
		JSRacer.race = new Race(raceInfo);
		JSRacer.view.renderRace(JSRacer.race);
		document.addEventListener('keyup', JSRacer.movePlayer);
		document.addEventListener('remoteMovePlayer', JSRacer.movePlayer);
	},
	movePlayer: function(event){
		switch(event.keyCode) {
			case 81:
				var racer = JSRacer.race.racers[0];
				racer.updatePosition();
				if (racer.position > (JSRacer.view.track.length - racer.size)){
					JSRacer.complete(racer);
				}
				JSRacer.view.renderRace(JSRacer.race);
				break;
			case 80:
				var racer = JSRacer.race.racers[1];
				racer.updatePosition();
				if (racer.position > (JSRacer.view.track.length - racer.size)){
					JSRacer.complete(racer);
				}
				JSRacer.view.renderRace(JSRacer.race);
				break;
		};
	},
	complete: function(winner){
		alert(winner.name + " wins!");
		JSRacer.restart();
	},
	restart: function(){
		for(var racerIndex in JSRacer.race.racers){
			JSRacer.race.racers[racerIndex].position = 0;
		}
		JSRacer.view.renderRace(JSRacer.race);
	}
}