$(document).ready(initializeApp);

var game;
function initializeApp(){
	game = new CarWarsEngine();
	game.loadTrackInitiate('images/track_bounds.jpg');
	game.loadCar( { driver: 'Dan', number: 43, color:"yellow",position: {
		x: 400,
		y: 100
	},});
	game.loadCar( { driver: 'John', number: 14, color: "lawngreen",position: {
		x: 340,
		y: 100
	},});
	game.loadCar( { driver: 'Rebecca', number: 13, color: "hotpink",position: {
		x: 400,
		y: 50
	},});
	game.loadCar( { driver: 'Federico', number: 99, color: "orangered",position: {
		x: 340,
		y: 50
	},});
	game.start();
}

