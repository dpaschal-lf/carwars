

class CarWarsEngine{
	constructor(options={}){
		var defaultOptions = {
			trackContainer: $('body')
		}
		this.options = {};
		for(var key in defaultOptions){
			if(options[key]){
				this.options[key] = options[key]; 
			} else {
				this.options[key] = defaultOptions[key];
			}
		}
		this.cars = [];
		this.playerCar = null;
		this.track = null;
		this.trackContext = null;
		
	}
	loadTrackInitiate(trackFile){
		this.track = $("<canvas>");
		$("#trackContainer").append(this.track);
		this.trackContext = this.track[0].getContext('2d');
		var image = new Image();
		image.onload = this.loadTrackFinish.bind(this, image);
		image.src = trackFile;
	}
	loadTrackFinish(loadedImage){
		this.track.attr({
			height: loadedImage.height,
			width: loadedImage.width
		})
		this.track.css({
			height: loadedImage.height+'px',
			width: loadedImage.width+'px'
		})
		this.trackContext.drawImage( loadedImage, 0,0);
	}
	loadCar(specs){
		var car = new Car(specs);
		if(this.cars.length===0){
			this.playerCar = car;
		}
		this.cars.push(car);
		var domElement = car.render();
		this.options.trackContainer.append(domElement)
	}
	start(){
		this.cars.forEach( car => car.start());
		this.addEventHandlers()
	}
	stop(){
		this.cars.forEach( car => car.stop());
		$('body').off('keydown').off('keyup');
	}
	addEventHandlers(){
		$('body').on('keydown',this.handleKeyPresses.bind(this));
		$('body').on('keyup',this.handleKeyUps.bind(this))
	}
	handleKeyPresses(event){
		switch(event.key){
			case 'w': 
				this.playerCar.accelerate(1)
				break;
			case 's':
				this.playerCar.decelerate(1);
				break;
			case 'a':
				this.playerCar.turn(-1);
				break;
			case 'd':
				this.playerCar.turn(1);
				break;
		}
	}
	handleKeyUps(event){
		switch(event.key){
			case 'w': 
				this.playerCar.accelerate(0)
				break;
			case 's':
				this.playerCar.decelerate(0);
				break;
			case 'a':
			case 'd':
				this.playerCar.turn(0);
				break;
		}
	}
}










