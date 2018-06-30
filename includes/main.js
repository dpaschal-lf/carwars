$(document).ready(initializeApp);

var game;
function initializeApp(){
	game = new CarWarsEngine();
	game.loadTrackInitiate('images/track_bounds.jpg');
	game.loadCar( { driver: 'dan', number: 1});
	game.start();
}

