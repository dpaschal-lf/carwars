
//this is an es6 object constructor.  This uses the class method.
//the new keyword, in conjunction with this, will make a custom object
class CarWarsEngine{
	//this function is run by javascript when the object is created
	//it is a function in every way, just inside an object
	//it will take a parameter.  in this case, if that parameter is undefined, it will be changed to an object instead
	constructor(options={}){
		//this object will serve as a set of default values if
		//none are provided by the object constructor.  
		//so for example, if the options Object doesn't have 
		//a key of trackContainer, it will get the below value
		//automatically
		var defaultOptions = {
			trackContainer: $('body')
		}
		//this object will hold the actual options for later use
		//it will be populated by the options local variable above
		//this. makes it attach itself as a property of the object made by CarWarsEngine
		this.options = {};
		//go through the defaultOptions variable.  Use the keys
		//in that object to detect if other keys exist in the 
		//local variable "options".
		//if the key DOES NOT exist, use the value in "defaultOptions"
		//and put the corresponding value into "this.options".
		//if the key DOES exist, use that value from the local var to put
		//into "this.options"
		for(var key in defaultOptions){
			if(options[key]){
				this.options[key] = options[key]; 
			} else {
				this.options[key] = defaultOptions[key];
			}
		}
		//this array will hold all cars on the track
		this.cars = [];
		//this var will point to the car that is directly controlled
		//by the active player.  as opposed to AI players, remote players, or some such
		this.playerCar = null;
		//these two variables will point to the track object
		this.track = null;
		//the context pointer points to an interface to deal with a canvas element
		this.trackContext = null;
		
	}
	//this function will start loading an image into the race track.
	//this is an asynchronous operation, like setTimeout, so it could happen
	//at any point in the future.  
	//this is why there is a start and end function
	loadTrackInitiate(trackFile){
		//make a canvas element and store it on the object
		this.track = $("<canvas>");
		//append the canvas to the parent container
		$(this.options.trackContainer).append(this.track);
		//contexts are needed to interface with canvas elements. 
		//create it and store it
		this.trackContext = this.track[0].getContext('2d');
		//make a new image object to store our track picture
		var image = new Image();
		//tell the image that when it finishes loading
		//call the loadTrackFinish object in this object.
		//bind tells the function to keep "this" in the new
		//function pointing at our CarWarsEngine object.
		//it also passes our image variable into the new function
		//as a parameter
		image.onload = this.loadTrackFinish.bind(this, image);
		//tell the image to load the image src
		image.src = trackFile;
	}
	//this function will handle finishing up the loading once
	//the image finishes its src load
	loadTrackFinish(loadedImage){
		//change the track's height and width properties to 
		//the image's height and width.
		//this will change the pixel size of the canvas
		this.track.attr({
			height: loadedImage.height,
			width: loadedImage.width
		})
		//this will change the physical size of the canvas
		this.track.css({
			height: loadedImage.height+'px',
			width: loadedImage.width+'px'
		})
		//place the image into the canvas starting at 0,0 (the top left)
		this.trackContext.drawImage( loadedImage, 0,0);
	}
	//this function takes in a configuration object and creates a car
	loadCar(specs){
		//create a new object based on the Car template
		var car = new Car(specs);
		//if there are no other cars stored, make this the main car
		if(this.cars.length===0){
			this.playerCar = car;
		}
		//add this car to the car array
		this.cars.push(car);
		//call the car's render function to generate html for i
		var domElement = car.render();
		//append that html to the dom
		this.options.trackContainer.append(domElement)
	}
	//function to start the game, go through each car and call its start function
	start(){
		//forEach is like a for loop.  call start on each car in the list
		this.cars.forEach( car => car.start());
		//call the addEventHandlers function on the CarWarsEngine
		this.addEventHandlers()
	}
	//function to stop the game.  go through each car and call its stop function
	stop(){
		this.cars.forEach( car => car.stop());
		//remove the keydown and keyup event handlers from the body
		$('body').off('keydown').off('keyup');
	}
	//function to add event handlers to the body
	addEventHandlers(){
		//add keydown handlers to the body to catch key presses
		$('body').on('keydown',this.handleKeyPresses.bind(this));
		//add keyup handlers to the body to catch key releases
		$('body').on('keyup',this.handleKeyUps.bind(this))
	}
	//function to receive the key press and determine which button was pressed
	//then take appropriate action
	handleKeyPresses(event){
		//event is the object generated by all events, it contains 
		//data about the event, like time and buttons pressed
		switch(event.key){
			//event.key is the letter pressed
			case 'w': 
				//call the first car's accelerate function with a value of 1 to move go forward
				this.playerCar.accelerate(1)
				break;
			case 's':
				//call the first car's decelerate function with a value of 1 to turn on the brakes
				this.playerCar.decelerate(1);
				break;
			case 'a':
				//call the first car's turn funtion to go left
				this.playerCar.turn(-1);
				break;
			case 'd':
				//call the first car's turn function to go right
				this.playerCar.turn(1);
				break;
		}
	}
	//handle the key releases in the same way as the key downs, but in reverse
	handleKeyUps(event){
		switch(event.key){
			case 'w': 
				//take the foot off the gas
				this.playerCar.accelerate(0)
				break;
			case 's':
				//take the foot off the brake
				this.playerCar.decelerate(0);
				break;
			case 'a':
			case 'd':
				//stop steering left or right (center the wheel)
				this.playerCar.turn(0);
				break;
		}
	}
}










