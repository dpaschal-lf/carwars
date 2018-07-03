

class Car extends Mover{
	constructor(options){
		super(options);
		this.parts = {
			body: null,
			windshield: null,
			number: null,
			wheels: []
		};
		this.firingTimer = null;

		/*modify these to change the defaults for all cars
		pass them into the car in main.js to add traits unique to
		a particular car*/
		var defaultOptions = {
			driver: 'dummy', 
			color: 'grey',
			number: 1, 
		}
		this.incorporateOptions(defaultOptions, options);		
	}
	fireBullet(){
		var bullet = new Bullet({ drag:0, acceleration: 0, deceleration: 0, position: {x: this.options.position.x, y: this.options.position.y}, currentSpeed: 10, maxSpeed: 10, maxDistance: 200, angle: this.options.angle});
		var bulletDom = bullet.render();
		$("body").append(bulletDom);
		bullet.start();
	}
	fireCurrentWeapon(){
		if(!this.firingTimer){
			this.firingTimer = setInterval( this.fireBullet.bind(this), 250);
		} else{
			clearInterval(this.firingTimer);
			this.firingTimer = null;
		}
	}
	update(){
		super.update();

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