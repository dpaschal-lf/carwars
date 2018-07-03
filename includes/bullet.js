

class Bullet extends Mover{
	constructor(options){
		super(options);
		this.parts = {
			body: null,
		};

		/*modify these to change the defaults for all cars
		pass them into the car in main.js to add traits unique to
		a particular car*/
		var defaultOptions = {
			owner: 'dummy', 
			color: 'grey',
		}
		this.incorporateOptions(defaultOptions, options);		
	}
	render(){
		this.parts.body = $("<div>",{
			'class': 'bullet',
			css: {
				'background-color': this.options.color,
				left: this.options.position.x+'px',
				top: this.options.position.y+'px'
			}
		});
	
		return this.parts.body;
	}
}