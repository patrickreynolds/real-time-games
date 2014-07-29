$(function(){

// ================= Model =================
function Race(raceInfo) {
	this.trackType = raceInfo.trackType
	this.racers = this.initRacers(raceInfo.players)
}

Race.prototype = {
	initRacers: function(players){
		var racers = [];
		for (var racer in players) {
			racers.push(new Racer(players[racer]));
		}
		return racers;
	}
}

function Racer(racerInfo) {
	this.id 				= racerInfo.id;
	this.name 			= racerInfo.name;
	this.style 			= racerInfo.style;
	this.size 			= 40;
	this.position 	= 0; 
	this.playerType = 'racer'
}

Racer.prototype = {
	updatePosition: function(){
		this.position += this.size;
	}
}

// ================= View =================
function View() {
	this.track = document
							.getElementById("track");
	this.track.length = document.getElementById("track")
											.getAttribute("width");
	this.racers = [];
}

View.prototype = {
	bindEvents: function(){
		var raceInfoForm = document
											.getElementById("game-info-form");
		raceInfoForm.addEventListener('submit', jsracer.startRace.bind(this));
	},
	trackType: function(){
		return document.getElementById("track-types")
										.options[document.getElementById("track-types")
										.selectedIndex]
										.value;
	},
	incrementPlayerCount: function(){
		// Increment players
	},
	playerCount: function(){
		return 2; 
	},
	players: function(){
		var players = [];

		for (var i = 1; i <= this.playerCount(); i++) {
			var player 		= {};
			player.id 		= i;
			player.name 	= document
											.getElementById("racer-"+ i +"-name")
											.value;
			player.style 	= document
											.getElementById("racer-"+ i +"-color")
											.value;
			player.playerType = 'racer'
			players.push(player);
		}

		return players;
	},
	raceInfo: function(){
		var infoForm = {};
		infoForm.trackType = this.trackType();
		infoForm.players = this.players();

		return infoForm;
	},
	renderTrack: function(type, racers){
		if (type === 'drag') {
			var topMargin 	= 100;
			var leneWidth 	= 40;
			var trackWidth 	= 800;

			for(var racer in racers) {
				var lane = this.track.getContext('2d');
	    	lane.beginPath();
	    	lane.moveTo(0, topMargin);
	    	lane.lineTo(trackWidth, topMargin);
	    	lane.lineWidth = leneWidth;
	    	lane.stroke();
	    	topMargin += 100;
			}
		};
	},
	renderPlayers: function(view, racers){
		var topMargin = 80;
		var pieceSize = 40;

		for (var racerIndex in racers) {
			var piece = this.track.getContext('2d');
      piece.beginPath();
      piece.rect(racers[racerIndex].position, topMargin, pieceSize, pieceSize);
      piece.fillStyle = racers[racerIndex].style;
      piece.fill();
      view.racers.push({racer: piece})
      topMargin += 100;
		}
	},
	renderRace: function(race){
		this.renderTrack(race.trackType, race.racers)
		this.renderPlayers(this, race.racers);
	}
}


// ================= Controller =================
function JSRacer() {
	this.view = new View();
}

JSRacer.prototype = {
	start: function(){
		this.bindEvents();
	},
	bindEvents: function(){
		this.view.bindEvents();
	},
	startRace: function(event){
		event.preventDefault();
		var raceInfo = this.raceInfo();
		jsracer.race = new Race(raceInfo);
		jsracer.view.renderRace(jsracer.race);
		document.addEventListener('keyup', jsracer.movePlayer);
		document.addEventListener('remoteMovePlayer', jsracer.movePlayer);
	},
	movePlayer: function(event){
		switch(event.keyCode) {
			case 81:
				var racer = jsracer.race.racers[0];
				racer.updatePosition();
				if (racer.position > (jsracer.view.track.length - racer.size)){
					jsracer.complete(racer);
				}
				jsracer.view.renderRace(jsracer.race);
				break;
			case 80:
				var racer = jsracer.race.racers[1];
				racer.updatePosition();
				if (racer.position > (jsracer.view.track.length - racer.size)){
					jsracer.complete(racer);
				}
				jsracer.view.renderRace(jsracer.race);
				break;
		};
	},
	complete: function(winner){
		alert(winner.name + " wins!");
		jsracer.restart();
	},
	restart: function(){
		for(var racerIndex in jsracer.race.racers){
			jsracer.race.racers[racerIndex].position = 0;
		}
		jsracer.view.renderRace(jsracer.race);
	}
}


// ================= Kickoff ================= 
window.addEventListener( 'load', init, false );
function init() {
	// Start the controller
	jsracer = new JSRacer();
	jsracer.start();
}

// Enable pusher logging - don't include this in production
  // Pusher.log = function(message) {
  //   if (window.console && window.console.log) {
  //     window.console.log(message);
  //   }
  // };

  var pusher = new Pusher('4f0fd90ff9f08ea1d061');

  var channelId = "jsracer-" + $('#game-container').data('gameroom')
  var channel = pusher.subscribe(channelId);
  debugger
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