// Cute Angles

// Write a function that takes a floating point number representing an angle
// Angle will be between 0 and 360 degrees,
// Return a string representing angle in degrees, minutes, and seconds

// 60 minutes in a degree, and 60 seconds in a minute

// Initialize constants for minutes per degree and seconds per minute
// Use remainder and floor to get degrees minutes and seconds

const MINUTES_PER_DEGREE = 60;
const SECONDS_PER_MINUTE = 60;
const FULL_ROTATION = 360;

function dms(angle) {
  angle = (FULL_ROTATION + (angle % FULL_ROTATION)) % FULL_ROTATION;
  let degrees = Math.floor(angle);
  let minutes = angle % 1 * MINUTES_PER_DEGREE;
  let seconds = Math.floor(minutes % 1 * SECONDS_PER_MINUTE);
  
  minutes = Math.floor(minutes)
  return `${degrees}˚${padZeroes(minutes)}'${padZeroes(seconds)}`;
}

function padZeroes(number) {
  number = String(number);
  return number.length === 1 ? '0' + number : number;
}

// Combining Arrays

// Write a function that takes two arrays
// Returns an array containing the unique values of of the two

// Use reduce to build up an array, use includes to check if the array has the value

function union() {
  return [...arguments].flat().reduce((unionArr, val) => {
    return unionArr.includes(val) ? unionArr : [...unionArr, val];
  }, []);
}

// Halvsies

// Write a function that takes an array as an arg
// Returns an array that contains two elements, each which is an array
// first array returned will have first half of elements (including the middle element)
// second array returned will have the second half of the elements

// Find the halfway point, length divided by two rounded up
// use slice for new arrays

function halvsies(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

// Find the Duplicate

// Given an unordered array
// Find the one value that occurs twice (every other value will occur once)
// Return the duplicate value

// Use splice to remove an element and search if it includes it, return the num if it does include

function findDup(arr) {
  do {
    let val = arr.splice(0, 1)[0];
    if (arr.includes(val)) return val;
  } while (arr.length !== 0);
}

// Combine Two Lists

// Write a function that combines two arrays passed as args
// Returns a new arr containing all elements from both array args alternating elements
// Assume both arrays are non-empty and same size

// iterate through arr1.length times to build the array up

function interleave(left, right) {
  let result = []

  for (let i = 0; i < left.length; i++) {
    [...result, left[i], right[i]];
  }

  return result
}

function interleave(left, right) {
  return left.reduce((result, _, idx) => [...result, left[idx], right[idx]], []);
}

// Multiplicative Average

// Write a function that takes an array of ints as input
// Multiplies all of the ints together, divides the result by number of entries
// Returns the string with the value rounded to 3 decimal places

// find the product using reduce and then divide by array length.
// Use toFixed() on the number to return a string with precision of x

function showMultiplicativeAverage(nums) {
  const average = nums.reduce((product, num) => num * product, 1) / nums.length;
  return average.toFixed(3);
}

// Multiply Lists

// Write a function that takes two array args w/ list of nums
// Return a new array that contains the product of each pair of nums

// Use map to alter the values of arr1, using the optional index to find the other value

function multiplyList(list1, list2) {
  return list1.map((val, idx) => val * list2[idx]);
}

// Digits List

// Write a function that takes one arg (pos int)
// Returns a list of digits in the num

// Convert num to string, split the string, and then map each value back to string

function digitList(digits) {
  return String(digits).split('').map(Number);
}

// How Many

// Write a function that counts the number of occurences of each element in an array
// Once counted log each element w/ the occurences

// Use reduce to build up the counts
// Use a for in statement to log each key => value

function countOccurrences(arr) {
  const counts = arr.reduce((counts, val) => ({
    ...counts,
    [val]: (counts[val] || 0) + 1,
  }), {});

  for (val in counts) console.log(val + ' => ' + counts[val]);
} 

// Array Average

// Write a function that takes one arg (arr of ints)
// Returns the average of all the ints in the array
// Rounded down to the integer component of the average

// Use Math.floor to round down and reduce to find the average

function average(arr) {
  return Math.floor(arr.reduce((sum, val) => sum + val) / arr.length);
}

