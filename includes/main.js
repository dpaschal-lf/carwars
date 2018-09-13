$(document).ready(initializeApp);

var game;
function initializeApp(){
	game = new CarWarsEngine();
	game.loadTrackInitiate('images/track_bounds.jpg');
	game.loadCar( { driver: 'dan', number: 1});
	game.loadCar( { driver: 'gerry', number: 13, position: {x:200, y:200}, color: 'pink'});
	game.start();
}

