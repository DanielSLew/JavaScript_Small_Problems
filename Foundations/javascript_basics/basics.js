// Exercise 2

var myBoolean = true;
var myString = 'hello';
var myArray = [];
var myOtherString = '';

if (myBoolean) {
  console.log('Hello');
}

// Hello

if (!myString) {
  console.log('World');
}

if (!!myArray) {
  console.log('World');
}

// World

if (myOtherString || myArray) {
  console.log('!');
}

// !

// Exercise 3

if (condition1) {
  // ...
  if (condition2) {
    // ...
  } else {
    // ...
  }
} else {
  // ...
  if (condition4) {
    // ...
    if (condition5) {
    // ...
    }
  }
}

// How many Unique execution paths?
// 5 paths

// Exercise 4

var name = 'Bob';
var saveName = name;
name = 'Alice';
console.log(name, saveName);

// This code logs Alice, Bob

var name = 'Bob';
var saveName = name;
name.toUpperCase();
console.log(name, saveName);

// This code logs Bob, Bob 
//  Because the return of name.toUpperCase() is not saved in any variable

// Exercise 5

var number1 = prompt('Enter the first number:');
var number2 = prompt('Enter the second number:');

console.log(number1 + ' + ' + number2 + ' = ' + (number1 + number2));
console.log(number1 + ' - ' + number2 + ' = ' + (number1 - number2));
console.log(number1 + ' * ' + number2 + ' = ' + (number1 * number2));
console.log(number1 + ' / ' + number2 + ' = ' + Math.floor(number1 / number2));
console.log(number1 + ' % ' + number2 + ' = ' + (number1 % number2));
console.log(number1 + ' ** ' + number2 + ' = ' + Math.pow(number1, number2));

// Does this code produce the following?

// Enter the first number: 23
// Enter the second number: 17

// 23 + 17 = 40
// 23 - 17 = 6
// 23 * 17 = 391
// 23 / 17 = 1
// 23 % 17 = 6
// 23 ** 17 = 1.4105003956066297e+23

// No because prompt returns a string, so we using operators on strings for the first case.
// We need to use parseInt(prompt(''), 10)

// Exercise 6

// Write a program that asks user for a phrase
// Output the number of characters in that phrase
// Use String.prototype.length

let phrase = prompt('Please enter a phrase: ');
phraseOnlyAlphabetic = phrase.replace(/[^a-z]\s/i, '');

console.log(`There are ${phraseOnlyAlphabetic.length} characters in \"${phrase}\".`);

// Exercise 7

// Function takes a string of digits
// Return the appropriate number
// Do not use any built in functions for converting string to number

// Create a constant array of string digits which will map to its index value
// Initialize a result variable
// Iterate through each string digit backwards

const DIGITS = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, 
  '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
};

function stringToInteger(string) {
  let integer = 0;
  let power = 0;

  for (let i = string.length - 1; i >= 0; i -= 1, power += 1) {
    integer += DIGITS[string[i]] * Math.pow(10, power);
  }

  return integer;
}

// Exercise 8

// Function takes a number with an optional + or - sign leading the digits
// Return the appropriate number
// Assume string always has a valid number

// Check each digit as before, but skip the iteration if it matches '+-'
// Check if the first digit matches '-', if it does multiply by -1

function stringToSignedInteger(string) {
  let integer = 0;
  let power = 0;

  for (let i = string.length - 1; i >= 0; i -= 1, power += 1) {
    if (string[i].match(/[-+]/)) break;
    integer += DIGITS[string[i]] * Math.pow(10, power);
  }

  return string[0] === '-' ? -integer : integer;
}

// Exercise 9

// Write a function that takes a pos int or 0
// Return the string representation of it

// Take the number and divide it by 10 to the power of x, modulo 10
// Iterate through each digit this way
// Initialize an array of string digits to map the digit to

const STRING_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function integerToString(number) {
  let string = '';
  let remainder;

  do {
    remainder = number % 10;
    number = Math.floor(number / 10);

    string = STRING_DIGITS[remainder] + string;
  } while (number > 0);

  return string;
}

// Convert a Signed Number to String

// Add a + or - to the string if it is positive or negative
// Check if its positive, then use absolute with the number passing to function
// return "0" if 0
// Otherwise check if number is under 0, then append a "-" otherwise append a "+"

function signedIntegerToString(integer) {
  let string = integerToString(Math.abs(integer));
  if (string === "0") return string;

  return integer > 0 ? '+' + string : '-' + string;
}


