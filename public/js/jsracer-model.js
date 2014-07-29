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