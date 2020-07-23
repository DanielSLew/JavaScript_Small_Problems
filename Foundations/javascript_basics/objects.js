// Objects

// Literal Method

// What is the result of the last line of code?
var person = {
  firstName: function () {
    return 'Victor';
  },
  lastName: function () {
    return 'Reyes';
  },
};

console.log(person.firstName + ' ' + person.lastName);
// It will print out
// function () {
//     return 'Victor';
//   } function () {
//     return 'Reyes';
//   }
// Object literal methods must be called by appending parentheses to be executed
// So it just returns the function itself.

// Mutation

// What will this code log?
var array1 = ['Moe', 'Larry', 'Curly', 'Shemp', 'Harpo', 'Chico', 'Groucho', 'Zeppo'];
var array2 = [];
var i;

for (i = 0; i < array1.length; i += 1) {
  array2.push(array1[i]);
}

for (i = 0; i < array1.length; i += 1) {
  if (array1[i].startsWith('C')) {
    array1[i] = array1[i].toUpperCase();
  }
}

console.log(array2);

// To make the changes in array1 reflect array2 we need to make array2 a refertence
// to array1 at the start
// If we had an object literal as part of array1 elements pushed to array2, changes
  // to the object literal in array1 would be refleced in array2 because objects
  // are mutable and they both reference the same object.

// Dynamic

var myObject = {
  prop1: '123',
  prop2: '234',
  'prop 3': '345',
};

var prop2 = '456';
myObject['prop2'] = '456';
myObject[prop2] = '678';

console.log(myObject[prop2]);
console.log(myObject.prop2);

// The first log contains a reference to prop2 variale which equals '456' which was then used
// as a key and assigned the value '678', so it will log that
// The second log references the property 'prop2' which was reassigned to '456'

var myObj = {};
myObj[myFunc()] = 'hello, ';

function myFunc() {
  return 'funcProp';
}

console.log(myObj);
myObj[myFunc()] = 'world!';
console.log(myObj);

// This is will log {funcProp: 'hello, '} because myFunct() is invoked, so the return
// Value is the reference in myObj[myFunc()]
// We then reassign funcProp property to have the value 'world!'
// The next line will log {funcProp: 'world!'}

// Array Object Part 1

var myArray = ['a', 'b', 'c'];

console.log(myArray[0]);
console.log(myArray[-1]);

myArray[-1] = 'd';
myArray['e'] = 5;
myArray[3] = 'f';

console.log(myArray[-1]);
console.log(myArray['e']);
console.log(myArray);

// This will log 'a'
// undefined because the '-1' property does not exist

// 'd' because we set the '-1' property on line 92
// 5 because we set the 'e' property on line 93
// ['a', 'b', 'c', 'f', '-1': 'd', e: 5]

// Array Object Part 2

// The user expects the `average` function to reutrn 5, is this correct?
var myArray = [5, 5];
myArray[-1] = 5;
myArray[-2] = 5;

function average(array) {
  var sum = 0;
  var i;

  for (i = -2; i < array.length; i += 1) {
    sum += array[i];
  }

  return sum / array.length;
}

average(myArray);

// In this case the summing works, as the variable sum after the for statement
// holds the value 20
// However array.length only takes into consideration it's elements, and it ignores
// it's properties. So it will be 20 / 2 which will return 10.
// To make this function work we need to change the return line to
return sum / Object.keys(array).length

// What's my Bonus

// function calculateBonus calculates the bonus for a given salary
// Args --- salary amount, boolean switch
// If true, bonus is half of salary, other bonus is 0

function calculateBonus() {
  return arguments[1] ? arguments[0] / 2 : 0;
}

// It will check if the second argument passed to the function is truthy
// If it is, it divides the first argument by 2, otherwise, returns 0.

// The End is Near But Not Here

// penultimate function takes a string
// Returns the next-to-last word in the string
// Words are any sequence of non-whitespace characters
// Assume string has at least two words

function penultimate(string) {
  return string.split(' ')[-2];
}

// This solution does not work because array's are objects, so it is referencing
// a property with the key '-2' which does not exist, so it will return undefined.
// To make it work we need to use slice to return the second last element

function penultimate(string) {
  return string.split(' ').slice(-2, -1)[0];
}

// After Midnight Part 1

// If num of minutes is positive, time is after midnight
// if negative time is before midnight

// timeOFDay function takes a time arg in minutes
// Returns time of day in 24-hour format
// Implement function using Date object

var MINUTES_PER_HOUR = 60;
var HOURS_PER_DAY = 24;
var MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

function timeOfDay(deltaMinutes) {
  var hours;
  var minutes;

  deltaMinutes = deltaMinutes % MINUTES_PER_DAY;
  if (deltaMinutes < 0) {
    deltaMinutes = MINUTES_PER_DAY + deltaMinutes;
  }

  hours = Math.floor(deltaMinutes / MINUTES_PER_HOUR);
  minutes = deltaMinutes % MINUTES_PER_HOUR;

  return padWithZeroes(hours, 2) + ':' + padWithZeroes(minutes, 2);
}

function padWithZeroes(number, length) {
  var numberString = String(number);

  while (numberString.length < length) {
    numberString = '0' + numberString;
  }

  return numberString;
}

// Create a Date object, set the hours to 24 and minutes to 0
// Add delta minutes,
// Return Hour and minute and pad with zeros if necessary

function timeOfDay(deltaMinutes) {
  var time = new Date(0, 0);
  time.setMinutes(time.getMinutes() + deltaMinutes);
  var minutes = time.getMinutes();
  var hours = time.getHours();

  return padWithZeroes(hours, 2) + ':' + padWithZeroes(minutes, 2);
}

// After Midnight Part 2

// Function takes a 24-hour time arg
// Return the number of minutes before or after midnight
// Return a value between 0 and 1439
// Refactor the solution to use a Date object

// Split the string into minutes and hours
// Convert time to minutes
// Declare a Date object to reference midnight
// Set the Date objects minutes to its own minutes plus minutes

var HOURS_PER_MINUTE = 60;
var MINUTES_PER_DAY = 1440

function afterMidnight(timeStr) {
  var time = new Date(`January 1, 2001 ${timeStr}:00`);
  return (time.getHours() * HOURS_PER_MINUTE) + time.getMinutes();
}

function beforeMidnight(timeStr) {
  var time = afterMidnight(timeStr);

  return (time) ? MINUTES_PER_DAY - afterMidnight(timeStr) : time;
}

