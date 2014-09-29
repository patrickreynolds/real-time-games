// ================= Controller =================
var JSRacer = {

  view: new View(),

  start: function(){
    this.bindEvents()
    this.view.renderTrack()
  },
  bindEvents: function(){
    this.view.bindEvents()
	},
	bindPusherEvents: function(channel){
    // Pusher Channels
    channel.bind('move_player_1', function(data) {
      var player1Event = document.createEvent('Event')
      player1Event.keyCode = 81
      player1Event.initEvent('remoteMovePlayer', true, true)
      document.dispatchEvent(player1Event)
    })

    channel.bind('move_player_2', function(data) {
      var player2event = document.createEvent('Event')
      player2event.keyCode = 80
      player2event.initEvent('remoteMovePlayer', true, true)
      document.dispatchEvent(player2event)
    })
  },
  startRace: function(event){
    event.preventDefault()

    var pusher = new Pusher('4f0fd90ff9f08ea1d061')
    //this is the views job
    var channelId = "jsracer-" + $('#game-container').data('gameroom')
    var channel = pusher.subscribe(channelId)
    // if you move bind event listeners to JSracer, then all these refs
    // to jsRacer will become this. (which makes more sense because, you've
    // already scoped the view to JSracer. 
    JSRacer.bindPusherEvents(channel)
    JSRacer.race = new Race(this.raceInfo())
    JSRacer.view.renderRace(JSRacer.race)

    //reak into own function. bindRaceListeners
    document.addEventListener('keyup', JSRacer.movePlayer)
    document.addEventListener('remoteMovePlayer', JSRacer.movePlayer)
	},
	movePlayer: function(event){
		switch(event.keyCode) {
			case 81:
        var racer = JSRacer.race.racers[0]
        //imagine a hash of racers
        // racers[keyCode] would return the racer pertaining to a specific keyCOde
        // { '81': racerObj1, '80': racerObj2}
        //break into function called updateRAcer, pass in the racer
        racer.updatePosition()
        if (racer.position > (JSRacer.view.track.length - racer.size))
          JSRacer.complete(racer)
        
        JSRacer.view.renderRace(JSRacer.race)
        break
			case 80:
        var racer = JSRacer.race.racers[1]
        racer.updatePosition()
        if (racer.position > (JSRacer.view.track.length - racer.size))
					JSRacer.complete(racer)
        JSRacer.view.renderRace(JSRacer.race)
        break
    }
  },
  complete: function(winner){
    alert(winner.name + " wins!")
    JSRacer.restart()
  },
  restart: function(){
    for(var racerIndex in JSRacer.race.racers){
      JSRacer.race.racers[racerIndex].position = 0
    }
    JSRacer.view.renderRace(JSRacer.race)
  }
}
