// Odd Numbers

// Log all odd numbers from 1 to 99 inclusive
// Log on separate lines

function oddNumbers() {
  for (var i = 1; i <= 99; i += 1) {
    if (i % 2 === 1) console.log(i);
  }
}

// Allow the user to specify the limits of the odd numbers

function oddNumbers(limit) {
  var i = 1;
  if (limit < 1) return;

  do {
    console.log(i)
    i += 2;
  } while (i < limit);
}

// Even Numbers

// Log all even numbers from 1 to 99 inclusive

function evenNumbers() {
  for (var i = 2; i < 99; i += 2) {
    console.log(i);
  }
}

// How Big is the Room

// Ask user for length and width of room in meters
// Logs to the console the area of the room in both meters and sq ft
// 1 square meter == 10.7639 sq ft
// use prompt()

function roomArea() {
  const SQ_METER_TO_SQ_FEET = 10.7639;
  var length;
  var width;
  var areaMeters;
  var areaFeet;

  length = parseInt(prompt('Enter the length of the room in meters:\n'));
  width = parseInt(prompt('Enter the width of the room in meters:\n'));


  areaMeters = length * width;
  areaFeet = areaMeters * SQ_METER_TO_SQ_FEET;

  console.log(`The area of the room is ${areaMeters.toFixed(2)}` +
              `square meters (${areaFeet.toFixed(2)} square feet).`);
}

function roomArea() {
  var length;
  var width;
  var unit;
  var area;

  do {
    unit = prompt('Do you want to compute the area in meters or feet?');
  } while (!(['meters', 'feet'].includes(unit.toLowerCase())));

  length = parseInt(prompt(`Enter the length of the room in ${unit}:\n`), 10);
  width = parseInt(prompt(`Enter the width of the room in ${unit}:\n`), 10);

  area = length * width;

  console.log(`The area of the room is ${area.toFixed(2)} in square ${unit}`);
}

// Tip Calculator

// Prompt for a bill amount and tip rate
// Program must compute tip
// Log both the tip and the total amount of the bill to the console

var bill;
var tipPercentage;
var tip;
var total;

bill = parseFloat(prompt('What is the bill? '));
tipPercentage = parseInt(prompt('What is the tip percentage? '));

tip = bill * tipPercentage / 100;
total = bill + tip;

console.log(`The tip is ${tip.toFixed(2)}`);
console.log(`The total is ${total.toFixed(2)}`);

//  Sum of Product of Consecutive Integers

// Write a program that asks the user to enter an integer greater than 0
// Then asks if the user wants to determine the sum or product of all numbers
  // between 1 and the integer inclusive

do {
  var int = parseInt(prompt('Please enter an integer greater than 0: '), 10);
} while (int < 1);

var operator;
var result = 0;

do {
  operator = prompt('Enter "s" to compute the sum, or "p" to compute the product. ');
} while (!(['s', 'p'].includes(operator.toLowerCase())));

if (operator === 'p') result += 1;

for (var i = 1; i <= int; i += 1) {
  operator === 's' ? result += i : result *= i;
}

console.log(`The product of the integers between 1 and ${int} is ${result}.`);

// Further exploration, if the input was an array of numbers:
var pickNumber = true;
var int;
var numArray = [];
var finalResult;

do {
  do {
    var int = parseInt(prompt('Please enter an integer greater than 0: '), 10);
  } while (int < 1);

  numArray.push(int);
  pickNumber = false;
  var pickNumber = prompt('Type "y" if you want to choose another number?');

  if (pickNumber.toLowerCase() === 'y') pickNumber = true;
} while (pickNumber === true);

do {
  operator = prompt('Enter "s" to compute the sum, or "p" to compute the product. ');
} while (!(['s', 'p'].includes(operator.toLowerCase())));

if (operator === 's') {
  finalResult = numArray.reduce((result, number) => result += number, 0);
} else {
  finalResult = numArray.reduce((result, number) => result *= number, 1);
}

// Short Long Short

// Write a function that takes two strings as args
// Determine the longer string and then returns the result of concatenating
  // the shorter string + longer string + shorter string

// Variables: short, long

// Compare the length of both strings, if string1 is longer, then it will equal long
// And vice versa
// Concatenate the new variables short, long, short together

function shortLongShort(string1, string2) {
  if (string1.length > string2.length) return string2 + string1 + string2;
  return string1 + string2 + string1;
}

// Leap Years Part 1

// Leap years occur every 4 years unless it is a 100th year, 
// It is a leap year if 400th year
// Assume rule is valid for any year greater than year 0
// Return true if leap year, false if not

// return false if year modulo 4 does not equal 0 or modulo 100 equals 0
// return true otherwise

function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

// Further exploration:
// Test years of 4 first, then 100, then 400:

function isLeapYear(year) {
  return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
}

// Leap Years Part 2

// Prior to year 1752 leap years occur every 4 years
// After 1752 leap years occur with the same rules as before

// Return true if year is before 1752 and divisible by 4

function isLeapYear(year) {
  return (year % 4 === 0) && (year < 1752 || year % 100 !== 0 || year % 400 === 0);
}

// Multiples of 3 and 5

// Write a function that computes the sum of all nums between 1 and some other num (inclusive)
  // that are multiples of 3 or 5
// Ie if num is 20 then result is (3 + 5 + 6 + 9 + 10....)
// Assume number passed in is an integer greater than 1

// Iterate through starting at 3 ending at the number
// If the number is divisible by 3 or 5, add to result

function multisum(number) {
  var i;
  var result = 0;

  for (i = 3; i <= number; i += 1) {
    if (i % 3 === 0 || i % 5 === 0) result += i;
  }

  return result;
}

// ASCII String Value

// Write a functoin that determines and returns the ASCII string value
// Sum the ASCII values of every char in the string

// Iterate through each char adding the char's ASCII value to a result variable

function asciiValue(string) {
  var i;
  var result = 0;

  for (i = 0; i < string.length; i += 1) {
    result += string.charCodeAt(i);
  }

  return result;
}

