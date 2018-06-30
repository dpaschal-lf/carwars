

class Car{
	constructor(options){
		this.parts = {
			body: null,
			windshield: null,
			number: null,
			wheels: []
		};
		this.timer = null;
		this.updateTime = 30;
		this.states = {
			accelerating: 0,
			decelerating: 0,
			turning: 0,
		}
		/*modify these to change the defaults for all cars
		pass them into the car in main.js to add traits unique to
		a particular car*/
		var defaultOptions = {
			angle: 0,
			driver: 'dummy', 
			currentSpeed: 0,
			maxSpeed: 4,
			acceleration: 2,
			deceleration: 4,
			drag: .5,
			handling: 90,
			color: 'grey',
			number: 1, 
			position: {
				x: 150,
				y: 100
			},
			delta: {
				x: 0,
				y: 0
			}
		}
		this.handlingSpecs = {
			maxSpeed: null,
			acceleration: null,
			deceleration: null,
			handling: null,
			drag: null			
		}
		this.options = {};
		for(var key in defaultOptions){
			if(options[key]){
				this.options[key] = options[key]; 
			} else {
				this.options[key] = defaultOptions[key];
			}
		}		
	}
	start(){
		if(this.timer){
			this.stop();
		}
		var timeSlices = 1000 / this.updateTime;

		for( var key in this.handlingSpecs){
			this.handlingSpecs[key] = this.options[key] / timeSlices;
		}

		this.timer = setInterval( this.update.bind(this), this.updateTime);
	}
	stop(){
		clearInterval(this.timer);
		this.timer = null;
	}
	update(){
		this.move();
	}
	convertDegreesToRadians(degrees){
		return degrees * Math.PI / 180;
	}
	move(){
		this.options.angle += this.states.turning;
		var currentRadians = this.convertDegreesToRadians(this.options.angle);
		if(this.states.accelerating){
			this.options.currentSpeed += this.handlingSpecs.acceleration;
		} else {
			this.options.currentSpeed -= this.handlingSpecs.drag;
		}
		if(this.states.decelerating){
			this.options.currentSpeed -= this.handlingSpecs.deceleration;
		}
		if(this.options.currentSpeed<this.handlingSpecs.drag){
			this.options.currentSpeed = 0;
			deltaDeltaX = 0;
			deltaDeltaY = 0;
		} else {
			if(this.options.currentSpeed > this.options.maxSpeed){
				this.options.currentSpeed = this.options.maxSpeed;
			}
			var deltaDeltaY = Math.sin(currentRadians) * this.options.currentSpeed;
			var deltaDeltaX = Math.cos(currentRadians) * this.options.currentSpeed;
		}
		this.options.position.x += deltaDeltaX;
		this.options.position.y += deltaDeltaY;
		console.log(this.options.currentSpeed);
		this.parts.body.css({
			left: Math.floor(this.options.position.x)+'px',
			top: Math.floor(this.options.position.y)+'px',
			transform: 'rotateZ('+this.options.angle+'deg)'
		})
	}
	accelerate(active){
		this.states.accelerating = active;
	}
	decelerate(active){
		this.states.decelerating = active;
		if(active){
			this.parts.brakeLights.show()
		} else {
			this.parts.brakeLights.hide()
		}
	}
	turn(multiplier){
		this.states.turning = multiplier;
	}
	render(){
		this.parts.body = $("<div>",{
			'class': 'car',
			css: {
				'background-color': this.options.color,
				left: this.options.position.x+'px',
				top: this.options.position.y+'px'
			}
		});
		this.parts.windshield = $("<div>", {
			'class': 'windshield'
		});
		this.parts.number = $("<div>", {
			'class': 'number',
			text: this.options.number
		})
		this.parts.brakeLights = $("<div>",{
			'class': 'brakelights',
			css: {
				display: 'none'
			}
		})
		this.parts.wheels = [];
		for(var i=0; i< 4; i++){
			this.parts.wheels.push($("<aside>",{ 'class': 'wheel'}));
		}
		this.parts.body.append(this.parts['windshield'],this.parts['number'], this.parts.wheels, this.parts.brakeLights );
		return this.parts.body;
	}
}