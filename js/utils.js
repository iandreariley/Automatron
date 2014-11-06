/* Checks whether all elements in argument are valid integer values
   Returns true if they are, false otherwise*/
var checkIntArray = function(intArray){
	for(var i = 0; i < intArray.length; i++)
		if(!isPosInt(intArray[i]))
			return false;
	return true;
}

/* Takes a value, returns true if it can be read as a base
   decimal integer, false otherwise Code taken from 'krisk'
   on stackoverflow */
var isPosInt = function(value){
	return !isNaN(value) && 
         parseInt(Number(value), 10) == value && 
         !isNaN(parseInt(value, 10)) &&
         parseInt(value, 10) > 0;
}

/* Builds an array of n dimensions, where n == dimensions.length
   Recieves an array of dimension lengths and an optional value.
   Returns an array of 'n' dimensions, with magnitudes determined
   by values in 'dimensions'. if a value parameter is specified
   all array elements are set to that value */

var ArrayBuilder = function(dimensions, value){
    var root = new Array(dimensions[0]); //root array object
    var queue = new Array(0); //objects needing array assignment are put into a queue
    queue.push(root);
    var currLength, arr;

    for(var d = 1; d < dimensions.length; d++){ //for each dimension
        currLength = queue.length; //dequeue only elements in current dimension
        for(var i = 0; i < currLength; i++){
            arr = queue.shift();
            for(var j = 0; j < arr.length; j++){
                arr[j] = new Array(dimensions[d]); //create new array element in next dimension
                queue.push(arr[j]); //push new array elements into queue for assignment
            }
        }
    }

    //if value was passed by user, set all elements equal to value
    if(typeof value !== "undefined")
	    for(var i = 0; i < queue.length; i++)
	         for(var j = 0; j < queue[i].length; j++)
	             queue[i][j] = value;

    return root;
};

/* Visits each element of an n-dimensional array and applies 'func' to
   each.

   Recieves: an array, a function, and, optionally, the dimensions of the array

   The function is one that takes two parameters, a coordinates
   array, giving the coordinates of the element w/in the array,
   and an array holding the dimensions of the array.
   The way the function is written, it always modifies
   the element, so if you want it unmodified, return 'this' at the 
   end of the function.

   Returns nothing. */

var visitEachIterative = function(array, func, dimensions){
    var el = 0;
    var coords = 1;
    var stack = [];
    stack.push([array, []]); //null coordinate set
    var next, arr;
    while(stack.length > 0){
        next = stack.pop();
        arr = next[el];
        for(var i = 0; i < arr.length; i++){
            //make a copy of coords with new dimension
            var coordsCopy = next[coords].slice();
            coordsCopy.push(i);
            if(arr[i] instanceof Array) //if an array, push to stack
                stack.push([arr[i], coordsCopy]);
            else
                arr[i] = func.call(el, coordsCopy, dimensions); //else call function on element
        }
    }
}