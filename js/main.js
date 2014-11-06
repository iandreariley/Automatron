function test_func(){
	for(var arg in arguments)
		console.log(arguments[arg]);
}

var test_func_two = function(){
	for(var arg in arguments)
		console.log(arguments[arg]);
};

var notAnArray = 2;
var anArray = [2,2,2];
var testArray = new Array(5);
var testomaton = null;

try{
	testomaton = new Automaton(anArray, test_func_two);
} catch (err) {
	testomaton = null;
	console.log(err)
}

if(testomaton){
	console.log(testomaton.board.length);
	console.log(testomaton.board[0].length);
	console.log(testomaton.board);
} else {
	console.log("totally null");
}