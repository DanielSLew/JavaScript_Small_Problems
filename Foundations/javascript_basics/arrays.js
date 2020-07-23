// ARRAYS EXERCISES

// Array Copy Part 1
// What will this code print?

var myArray = [1, 2, 3, 4];
var myOtherArray = myArray;

myArray.pop();
console.log(myOtherArray);

myArray = [1, 2];
console.log(myOtherArray);

// It prints [1, 2, 3], [1, 2, 3].

// Array Copy Part 2
// Change the code from the previous exercise to only copy the values, not the reference

var myArray = [1, 2, 3, 4];
var myOtherArray = myArray.slice();

function copy(array) {
  var i;
  var newArray;

  for (i = 0; i < array.length; i += 1) {
    newArray.push(array[i]);
  }

  return newArray;
}

var myOtherOtherArray = copy(myArray);

myArray.pop();
console.log(myOtherArray);

myArray = [1, 2];
console.log(myOtherArray);

// Array Concat Part 1
// Write a function that returns a new array composed of all values
// From the first array and the second array
// First arg will always be an array
// Second arg can either be an array or value
// Return new array
// Keep same order
// Function should copy any object references to new array
// Copy the values of primitive objects

// If the value is not an array, push the value into the array
// Otherwise, loop through the first array then the second, and push each value into a new array

// Return the new array

function concat(arr, secondArg) {
  var i;
  var concatArray = arr.slice();

  if (!Array.isArray(secondArg)) {
    concatArray.push(secondArg);
  } else {
    for (i = 0; i < secondArg.length; i += 1) {
      concatArray.push(secondArg[i]);
    }
  }

  return concatArray;
}

// Array Concat Part 2
// Revise the last solution to be able to concat two or more values/arrays

// Use a rest operator to allow indefinite num of args
// Loop through each of the args to determine if array or if not

function concat(...values) {
  var i;
  var j;
  var concatArray = [];

  for (i = 0; i < values.length; i += 1) {

    if (!Array.isArray(values[i])) {
      concatArray.push(values[i]);
    } else {
      for (j = 0; j < values[i].length; j += 1) {
        concatArray.push(values[i][j]);
      }
    }
  }

  return concatArray;
}

// Array Pop and Push
// Replicate pop() and push() methods
// pop will remove the last element of an array and return it, return undefined if arr is empty
// push will add one or more elements to the end of an array and return new length of arr

function pop(arr) {
  if (arr.length === 0) return undefined;
  var newLength = arr.length - 1;
  var deletedElement = arr[newLength];
  arr.length = newLength;
  return deletedElement;
}

// Use the rest parameter to accept any number of arguments
// Loop through the rest param to push each element into the array

function push(array, ...values) {
  var i;
  var arrayLength = array.length;

  for (i = 0; i < values.length; i += 1) {
    array[arrayLength + i] = values[i];
  }

  return array.length;
}

// Array and String Reverse

// Implement Array.prototype.reverse method
// It should accept either a string or an array as arg
// Return a new string or array

// Check to see if typeof is string, if so
// iterate through string backwards and add each element into reverseObject
// else, iterate through array backwards and push each element in reverse object
// return reverseObject

function reverse(object) {
  var i;
  var reverseObject = [];

  for (i = object.length - 1; i >= 0; i -= 1) {
    reverseObject.push(object[i]);
  }

  return (typeof object === 'string' ? reverseObject.join('') : reverseObject);
}

// Array Shift and Unshift

// Implement own versions of Array.prototype.shift and Array.prototype.unshift methods
// shift removes first ele from array and returns it (or undefined if empty)
// unshift adds one or more elements to the start of an array
  // Returns length of array
// Both mutate arr

// shift
// save the first element from the array
// Iterate through the array making the current element equal to the next element
// change the length of the array to - 1
// return the first element

function shift(array) {
  var i;
  var firstElement = array[0];

  if (array.length === 0) return undefined;

  for (i = 0; i < array.length; i += 1) {
    array[i] = array[i + 1];
  }

  array.length = array.length - 1;
  return firstElement;
}

// unshift
// Make a shallow copy of the array for reference
// iterate through the new values adding each value to the start of the arr
// Iterate through the shallow copy, adding each of the old values back in place
  // offset the values by adding newValues.length to its index

function unshift(array, ...values) {
  var i;
  var copy = array.slice();

  for (i = 0; i < values.length; i += 1) {
    array[i] = values[i];
  }

  for (i = 0; i < copy.length; i += 1) {
    array[i + values.length] = copy[i];
  }

  return array.length;
}

// Array Slice and Splice

// slice function takes three args
// Args: Array, begin index, end index
// Returns a function containing new Array
// containing elements from begin up to not including end

// Iterate through the array from begin to end, pushing elements to new array

function slice(array, begin, end) {
  var i;
  var arraySlice = [];

  if (begin > array.length) return arraySlice;

  for (i = begin, i < end && i < array.length; i += 1) {
    arraySlice.push(array[i]);
  }

  return arraySlice;
}

// splice function changes the contents of an array (deleting or adding)
// Args -- array, start index, deleteCount, (zero or more elements to be added)
// Remove deleteCount number of elements from array, starting at start index
// If option elements are provided, insert them into the array beginning at start index
// Return a new array containing deleted elements, or an empty array
// Mutates the original array

// If start is greater than array length set to array length
// If value of deleteCount is greater than the num of ele from start to end of arr
  // set deleteCount to the diff btwn array length and start
// If no elements are provided to be add, splice removes elements

// Variables -- i, copy (copy of original array), removedElements
// check if start is valid
// Check if adding or delete (elements array is empty)
// If deleteCount is more than 0
  // Iterate from start to start + deleteCount
  // set the current element to the current array index, to array index + deleteCount
  // after iterations, change array length to copy.length - deleteCount
// Otherwise push to array elements from start to valuesToAdd.length
  // Then add elements back into the array using arr[i + values.length] = copy[i]
  // start from start index
function splice(array, start, deleteCount, ...valuesToAdd) {
  var i;
  var length = array.length;
  var copy = array.slice();
  var removedElements = [];

  if (start > array.length) start = array.length;
  if (deleteCount > array.length - start) deleteCount = array.length - start;

  if (deleteCount > 0) {
    for (i = start; i < start + deleteCount; i += 1) {
      removedElements.push(array[i]);
      array[i] = array[i + deleteCount];
    }

    array.length = copy.length - deleteCount;
  }

  copy = array.slice();

  if (valuesToAdd.length > 0) {
    for (i = start; i <= valuesToAdd.length; i += 1) {
      array[i] = valuesToAdd[i - start];
    }

    for (i = start; i <= copy.length - start; i += 1) {
      array[i + valuesToAdd.length] = copy[i];
    }

    array.length = length - deleteCount + valuesToAdd.length;
  }

  return removedElements;
}

var arr = [1, 2, 3];
splice(arr, 1, 1, 'two');             // [2]
arr;                                  // [1, "two", 3]

var arr = [1, 2, 3];
splice(arr, 1, 2, 'two', 'three');    // [2, 3]
arr;                                  // [1, "two", "three"]

var arr = [1, 2, 3];
splice(arr, 1, 0);                    // []
splice(arr, 1, 0, 'a');               // []
arr;                                  // [1, "a", 2, 3]

var arr = [1, 2, 3];
splice(arr, 0, 0, 'a');               // []
arr;                                  // ["a", 1, 2, 3]

// Oddities

// This function takes an array as arg and returns each odd element
oddities([2, 3, 4, 5, 6]) === [2, 4, 6];      // false
oddities(['abc', 'def']) === ['abc'];         // false

// This is false because array comparison compares if they are the same object
// Not if they have the same values at each index
// To test this kind of equality we need to iterate through the array and return
// false is any elements are not equal to see if tehy contain the same values.

// Array Comparison

// Implement an array comparison method that order of elements doesn't matter

// Implement an element by element comparison after shallow copies of both arrays
  // have been sorted
// Don't use sort because the sorted items do not take into account the diff
// between '1', [1] and 1 so it is unreliable.

function areArraysEqual(left, right) {
  var i;
  var index;
  var rightCopy = right.slice();

  if (left.length !== right.length) {
    return false;
  }

  for (i = 0; i < left.length; i += 1) {
    index = rightCopy.indexOf(array[i])
    if (index > -1) {
      rightCopy.splice(index, 1);
    } else {
      return false;
    }
  }

  return true;
}




