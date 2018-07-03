

class Mover{
	constructor(options){
		this.timer = null;
		this.updateTime = 30;
		this.states = {
			accelerating: 0,
			decelerating: 0,
			turning: 0,
		}
		var moveDefaultOptions = {
			maxDistance: Infinity,
			currentDistance: 0,
			angle: 0,
			currentSpeed: 0,
			maxSpeed: 4,
			acceleration: 2,
			deceleration: 4,
			drag: .5,
			handling: 90,
			position: {
				x: 150,
				y: 100
			},
			delta: {
				x: 0,
				y: 0
			}
		}
		this.states = {
			accelerating: 0,
			decelerating: 0,
			turning: 0,
		}
		this.handlingSpecs = {
			maxSpeed: null,
			acceleration: null,
			deceleration: null,
			handling: null,
			drag: null			
		}
		this.options = {};
		this.incorporateOptions(moveDefaultOptions, options)	
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
		if(this.constructor === Bullet){
		//	debugger;
		}

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
		this.options.currentDistance+= (deltaDeltaX + deltaDeltaY);
		if( this.options.currentDistance > this.options.maxDistance){
			this.die();
		}
		this.options.position.x += deltaDeltaX;
		this.options.position.y += deltaDeltaY;
		this.parts.body.css({
			left: Math.floor(this.options.position.x)+'px',
			top: Math.floor(this.options.position.y)+'px',
			transform: 'rotateZ('+this.options.angle+'deg)'
		})
	}
	incorporateOptions(defaultOptions, externalOptions){
		for(var key in defaultOptions){
			if(externalOptions[key]!==undefined){
				this.options[key] = externalOptions[key]; 
			} else {
				this.options[key] = defaultOptions[key];
			}
		}			
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
	die(){
		this.stop();
		this.parts.body.remove();
	}
	turn(multiplier){
		this.states.turning = multiplier;
	}
}