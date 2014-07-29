// ================= Controller =================
var JSRacer = {

	view: new View(),

	start: function(){
		this.bindEvents();
	},
	bindEvents: function(){
		this.view.bindEvents();
	},
	startRace: function(event){
		event.preventDefault();
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