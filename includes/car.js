
//this is the object template for the cars
class Car{
	//this function runs on object creation
	constructor(options){
		//this will hold all the dom elements of the car
		this.parts = {
			body: null,
			windshield: null,
			number: null,
			wheels: []
		};
		//this will hold the reference to the interval timer to stop it
		this.timer = null;
		//how many milliseconds to wait between updates
		this.updateTime = 30;
		//this tracks the car's current control interfaces: gas, brake, and wheel
		this.states = {
			accelerating: 0,
			decelerating: 0,
			turning: 0,
		}
		/*modify these to change the defaults for all cars
		pass them into the car in main.js to add traits unique to
		a particular car*/
		var defaultOptions = {
			//the current angle of the car's movement, which dictates the angle of the car on screen
			angle: 0,
			driver: 'dummy', 
			//how fast i the car going
			currentSpeed: 0,
			//the maximum speed it can go
			maxSpeed: 4,
			//how fast can it accelerate per second
			acceleration: 2,
			//how fast it can decelerate per second due to braking
			deceleration: 4,
			//how fast it decelerates when gas it released
			drag: .5,
			//how fast it can turn in degrees per second
			handling: 90,
			color: 'grey',
			//the number on the roof
			number: 1, 
			//where the car currently is
			position: {
				x: 150,
				y: 100
			},
			//how fast the car's position is changing
			//I haven't used this yet
			delta: {
				x: 0,
				y: 0
			}
		}
		//this holds the values of the car's handling broken down on a per update basis.
		//for example 90 degrees per second, with an update twice a second, means each 
		//update would be 45 degrees
		this.handlingSpecs = {
			maxSpeed: null,
			acceleration: null,
			deceleration: null,
			handling: null,
			drag: null			
		}
		//this will hold the car's options after merging with the outside request and the defaults
		this.options = {};
		//merge all the defaults with the outside params
		for(var key in defaultOptions){
			if(options[key]){
				this.options[key] = options[key]; 
			} else {
				this.options[key] = defaultOptions[key];
			}
		}		
	}
	//this will start the car calculating it's position and such
	start(){
		//if there is already a timer going, stop it
		if(this.timer){
			this.stop();
		}
		//how many updates will there be per second
		var timeSlices = 1000 / this.updateTime;
		//update the values according to the current time slices
		for( var key in this.handlingSpecs){
			this.handlingSpecs[key] = this.options[key] / timeSlices;
		}
		//start the timer, it will all update every updateTimer milliseconds, 
		//it stores the ID of the timer into the this.timer
		this.timer = setInterval( this.update.bind(this), this.updateTime);
	}
	//stop the timer and clear it out so we know it is stopped
	stop(){
		clearInterval(this.timer);
		this.timer = null;
	}
	//every update tick, call the move function.  there could be more
	//functions in the future
	update(){
		this.move();
	}
	//trig functions work on radians but degrees are easier to think in
	convertDegreesToRadians(degrees){
		return degrees * Math.PI / 180;
	}
	move(){
		//if we are currently turning, alter the angle by that amount
		this.options.angle += this.states.turning;
		//convert the degrees to radians
		var currentRadians = this.convertDegreesToRadians(this.options.angle);
		//if we are accelerating, increase the current speed by our acceleration
		if(this.states.accelerating){
			this.options.currentSpeed += this.handlingSpecs.acceleration;
		} else {
			//otherwise decrease the speed by our drag
			this.options.currentSpeed -= this.handlingSpecs.drag;
		}
		//if we are braking, decrease the speed by the braking speed
		//yes, that means drag+braking happens
		if(this.states.decelerating){
			this.options.currentSpeed -= this.handlingSpecs.deceleration;
		}
		//if the speed drops below the drag deceleration, make the speed 0
		if(this.options.currentSpeed<this.handlingSpecs.drag){
			this.options.currentSpeed = 0;
			/*we break all movement speeds into x and y changes, for quickness
			of updates
			*/
			deltaDeltaX = 0;
			deltaDeltaY = 0;
		} else {
			//don't allow the speed to go above the car's max
			if(this.options.currentSpeed > this.options.maxSpeed){
				this.options.currentSpeed = this.options.maxSpeed;
			}
			/*calculate the change in X and Y speed based upon the angular speed
			      /|
			hyp  / |
			    /  | opp
			   /O__|
			    adj
			O is the angle of movement.
			hyp is the hypoteneuse, in this case our speed
			opp = opposite = y
			adj = adjacent = x
			Sin(O) = opp / hyp
			we need the y, so rearranging it we get
			Sin(O) * hyp = opp;
			or
			Sin (angle in radians) * speed = y speed
			*/
			var deltaDeltaY = Math.sin(currentRadians) * this.options.currentSpeed;
			var deltaDeltaX = Math.cos(currentRadians) * this.options.currentSpeed;
		}
		//alter our stored position based on our deltas
		this.options.position.x += deltaDeltaX;
		this.options.position.y += deltaDeltaY;
		console.log(this.options.currentSpeed);
		//alter our dom car's position
		this.parts.body.css({
			left: Math.floor(this.options.position.x)+'px',
			top: Math.floor(this.options.position.y)+'px',
			transform: 'rotateZ('+this.options.angle+'deg)'
		})
	}
	//change our accelerating value depending on if gas is pressed or not
	accelerate(active){
		this.states.accelerating = active;
	}
	//same for braking
	decelerate(active){
		this.states.decelerating = active;
		//turn off or on the brake lights (hide or show them)
		if(active){
			this.parts.brakeLights.show()
		} else {
			this.parts.brakeLights.hide()
		}
	}
	//dictate if we are turning left or right (-1 or 1) or straight (0)
	turn(multiplier){
		this.states.turning = multiplier;
	}
	//make the dom elements for our car
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
		//make 4 wheels
		for(var i=0; i< 4; i++){
			this.parts.wheels.push($("<aside>",{ 'class': 'wheel'}));
		}
		this.parts.body.append(this.parts['windshield'],this.parts['number'], this.parts.wheels, this.parts.brakeLights );
		return this.parts.body;
	}
}