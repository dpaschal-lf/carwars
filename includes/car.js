

class Car extends Mover{
	constructor(options){
		super(options);
		this.parts = {
			body: null,
			windshield: null,
			number: null,
			wheels: []
		};
		this.states = {
			accelerating: 0,
			decelerating: 0,
			turning: 0,
		}
		/*modify these to change the defaults for all cars
		pass them into the car in main.js to add traits unique to
		a particular car*/
		var defaultOptions = {
			driver: 'dummy', 
			color: 'grey',
			number: 1, 
		}
		this.incorporateOptions(defaultOptions, options);	
		for(var key in defaultOptions){
			if(options[key]){
				this.options[key] = options[key]; 
			} else {
				this.options[key] = defaultOptions[key];
			}
		}		
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