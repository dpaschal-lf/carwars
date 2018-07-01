$(document).ready(initializeApp);
//make a global variable for the main game.  this will make it easier to test from the console
var game;
function initializeApp(){
	//instantiate an object based on the CarWarsEngine object template 
	game = new CarWarsEngine();
	//call the loadTrackInitiate function in the CarWarsEngine object.  pass it a string that will tell it what track image to load into the background
	game.loadTrackInitiate('images/track_bounds.jpg');
	//call the loadCar function in the CarWarsEngine object.  Pass in an object that will give it values to start up with
	game.loadCar( { driver: 'dan', number: 1});
	//call the start function in the CarsWarsEngine object.  this will start animations and such
	game.start();
}

