/*******AUTOMATON SUPERCLASS*******/

/**************************************************
	Constructor
   Recieves: a function, rules, that
   defines the rules for the automaton, which takes
   a cell's coordinates and returns a value of 
   true (live) or false (dead)
   Returns: a shiny new Automaton object
***************************************************/
var Automaton = function(measurements, rules){
	if(!(measurements instanceof Array && checkIntArray(measurements)))
		throw "'dimensions' must be an array of positive integers with at least one element";
	if(!(rules instanceof Function))
		throw "'rules' must be a function";
	this.__nextValue__ = rules;
	this.measurements = measurements;
	this.dimension = measurements.length;
	this.board = ArrayBuilder(measurements);
	this.reset();
};

/* on and off members represent two possible values of cells */
Automaton.prototype.on = true;
Automaton.prototype.off = false;
Automaton.prototype.reset = function(){
	visitEachIterative(this.board,
		      function(dimensions,coordinates){return false;},
		      this.measurements);
};

Automaton.prototype.consoleDisplay = function(){
	visitEach(this.board,
			  function(dimensions, coordinates){
			  	for(var i = 0; i < dimensions; i++)
			  		if(coordinates[i] % dimensions[i] == 0)
			  			console.log('\n');
			  	console.log(" " + this);
			  	return this;
			  },
			  this.measurements, 0, new Array(0));
};