// Ddaaiillyy ddoouubbllee

// Write a function that takes a string arg
// Returns a new string that contains the val of orig str with all
  // consecutive chars collapsed into a single char

// Variables needed: i, newString

// Iterate through the string, if the current char does not equal the previous char
// Add it to the newString

function crunch(string) {
  var i;
  var newString = '';

  for (i = 0; i < string.length; i += 1) {
    if (string[i] !== string[i - 1]) newString += string[i]; 
  }

  return newString;
}

// Further exploration:
// Solve using Regex

// replace 2+ repetitions of a char with just the char itself

function crunch(string) {
  return string.replace(/(\w)\1+/g, '$1');
}

// Bannerizer

// Write a function that will take a short line of text
// Write that text to a console log within a box

// Create a border line where +- string.length of -'s -+
// Create an empty space line where | string.length of spaces |
// Create a message line that will be the same but with the string inputted
// log the message as the 5 lines in the end.

function logInBox(message, width) {
  if (!width) width = message.length;
  var remainingWidth = width - message.length;
  var border = `+-${'-'.repeat(width)}-+`;
  var padding = `| ${' '.repeat(width)} |`;
  var message = `| ${message}${' '.repeat(remainingWidth)} |`;

  console.log(border);
  console.log(padding);
  console.log(message);
  console.log(padding);
  console.log(border);
}

// Stringy Strings

// Write a function that takes one arg a pos int
// Returns a string of alternating '1's an 0's always start with '1'
// length of string should match int

// Use repeat on '10' to repeat int/2 times, add an extra '1' at the end if
// int % 2 === 1

function stringy(int) {
  var onesZeros = '10'.repeat(int / 2);
  if (int % 2 === 1) onesZeros += '1';

  return onesZeros
}

// Fibonacci Numbers Location by Length

// Write a function that calculates and returns the index of the first Fib num
// That has the num of digits specified by the arg

// Assume that the arg is always 2 or greater

// Variables: temp, num1, num2, index
// Use a do while statement that will add num1 to num2, to produce temp
// reassign num2 equal to num1 and num1 equal to temp
// Keep doing this until temp converted to a string's length is equal to int
// increment index by 1 each iteration

function findFibonacciIndexByLength(numDigits) {
  var temp;
  var num1 = 1
  var num2 = 1
  var idx = 2

  if (numDigits === 1) return 1;

  do {
    temp = num1 + num2;
    num2 = num1;
    num1 = temp;
    idx += 1
  } while (String(temp).length !== numDigits);

  return idx;
}

// Right Triangles

// Write a function that takes a pos int n as arg
// Logs a right triangle whose sides each have n stars
// Hypotenuse of the triangle should have one end at lower-left, and one upper-right

// Log int number of spaces
// Iterate through logging spaces i less times, and i number of stars

function triangle(height) {
  for (var i = 0; i <= height; i += 1) {
    console.log(' '.repeat(height - i) + '*'.repeat(i));
  }
}

// Madlibs

// Create a madlibs program that prompts for noun, verb, adverb, adjective
// Injects them into a story you create

// Use prompt to get the 4 variables
// Input them using string interpolation into a sentence

var noun = prompt('Enter a noun: ');
var verb = prompt('Enter a verb: ');
var adjective = prompt('Enter a adjective: ');
var adverb = prompt('Enter a adverb: ');

console.log(`Do you ${verb} your ${adjective} ${noun} ${adverb}??`);

// Double Doubles

// A double number is an even-length num whose left-side digits exact same as right-side digits
// Write a function that returns the number provided as arg * 2 unless arg is a double num
// Return double num as is

// if the number is an odd length, return the doubled number
// convert number to string
// Use slice to compare the first half to last half
// midpoint is string.length / 2

function twice(num) {
  var length = String(num).length;
  var midpoint = length / 2

  if (String(num).slice(0, midpoint) === String(num).slice(midpoint)) return num;

  return num * 2;
}

// Grade Book

// Write a function that determines the mean of three scores passed to it
// Return the letter associated with that grade

// Use an if statement to evaluate the average

function getGrade(grade1, grade2, grade3) {
  var average = (grade1 + grade2 + grade3) / 3;
  var grade;

  if (average >= 90) {
    grade = 'A';
  } else if (average >= 80) {
    grade = 'B';
  } else if (average >= 70) {
    grade = 'C';
  } else if (average >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  return grade;
}

// Clean Up the Words

// Given a string that consists of words and non-alphabetic chars
// Write a function that returns that string with all non-alphabetic chars
  // replaces with spaces
// consecutive non-alphabetic chars are replaced by a single space

// Use regex to find any instances of one or more non word chars and replace with space

function cleanUp(string) {
  return string.replace(/(\W)+/g, ' ');
}

// What Century is That

// Write a function that takes a year as input and returns century
// Return value should be a string with the century number ending with
  // 'st', 'nd', 'rd', or 'th' as appropriate
// New centuries begin in years that end with 01

// Take the year divided by 100 to get the century
// Use Math.ceil() to round the number up if the last three digits are more than 000
// If string ends with 1 - 'st', 2 - 'nd', 3 - 'rd'
// If string ends with '11', '12', 13' then 'th'

function century(year) {
  var centuryString = String(Math.ceil(year / 100));

  if (['11', '12', '13'].includes(centuryString.slice(-2))) return centuryString += 'th';
  
  switch (centuryString.slice(-1)) {
    case '3': return centuryString += 'rd';
    case '2': return centuryString += 'nd';
    case '1': return centuryString += 'st';
    default:  return centuryString += 'th';
  }
}
