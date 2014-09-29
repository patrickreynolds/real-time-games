// ================= View =================
function View() {
	this.track = document.getElementById("track")
	this.track.length = document
                        .getElementById("track")
                        .getAttribute("width")
	this.racers = []
}

View.prototype = {
	bindEvents: function(){
		var raceInfoForm = document.getElementById("game-info-form");
		raceInfoForm.addEventListener('submit', JSRacer.startRace.bind(this))
	},
	trackType: function(){
    return  document
					    .getElementById("track-types")
						  .options[document.getElementById("track-types")
						  .selectedIndex]
						  .value
	},
	incrementPlayerCount: function(){
		// Increment players
	},
	playerCount: function(){
		return 2
	},
	players: function(){
		var players = []

		for (var i = 1; i <= this.playerCount(); i++) {
			var player = {}
			player.id = i
			player.name = document
										  .getElementById("racer-"+ i +"-name")
											.value
			player.style = document
										  .getElementById("racer-"+ i +"-color")
										  .value
			player.playerType = 'racer'
			players.push(player)
		}

		return players
	},
	raceInfo: function(){
		var infoForm = {}
		infoForm.trackType = this.trackType()
		infoForm.players = this.players()

		return infoForm
	},
	renderTrack: function(type, racers){
		if (type === 'drag') {
			var topMargin  = 100
			var leneWidth  = 40
			var trackWidth = 800

			for(var racer in racers) {
				var lane = this.track.getContext('2d')
	    	lane.beginPath()
	    	lane.moveTo(0, topMargin)
	    	lane.lineTo(trackWidth, topMargin)
	    	lane.lineWidth = leneWidth
	    	lane.stroke()
	    	topMargin += 100
			}
		};
	},
	renderPlayers: function(view, racers){
		var topMargin = 80
		var pieceSize = 40

		for (var racerIndex in racers) {
			var piece = this.track.getContext('2d')
      piece.beginPath()
      piece.rect(racers[racerIndex].position, topMargin, pieceSize, pieceSize)
      piece.fillStyle = racers[racerIndex].style
      piece.fill()
      view.racers.push({racer: piece})
      topMargin += 100
		}
	},
	renderRace: function(race){
		this.renderTrack(race.trackType, race.racers)
		this.renderPlayers(this, race.racers)
	}
}
