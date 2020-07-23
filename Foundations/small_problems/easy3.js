// How Old is Teddy

// Build a program that randomly generates Teddy's age, and logs to console
// Num between 20 and 200

function randomBetween(max, min) {
  max = Math.max(max, min);
  min = Math.min(max, min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var age = randomBetween(20, 200);

console.log (`Teddy is ${age} years old!`);

// Searching 101

// Solicit 6 nums from the user
// Log a message describing if the 6th num appears amongst the first five nums

var numbers = [];
numbers.push(parseInt(prompt('Enter the 1st number: '), 10));
numbers.push(parseInt(prompt('Enter the 2nd number: '), 10));
numbers.push(parseInt(prompt('Enter the 3rd number: '), 10));
numbers.push(parseInt(prompt('Enter the 4th number: '), 10));
numbers.push(parseInt(prompt('Enter the 5th number: '), 10));
var lastNum = parseInt(prompt('Enter the last number: '), 10);

if (numbers.includes(lastNum)) {
  console.log(`The number ${lastNum} appears in [` + numbers.join(', ') + '].');
} else {
  console.log(`The number ${lastNum} does not appear in [` + numbers.join(', ') + '].');
}

var value = 25;
const condition = (element) => element > value;

if (numbers.some(condition)) {
  console.log(`There is a number higher than ${value} in [` + numbers.join(', ') + '].');
} else {
  console.log(`There is not a number higher than ${value} in [` + numbers.join(', ') + '].');
}

// When Will I Retire

// Build a program that logs when the user will retire
// And how many more years the user has to work

var rLSync = require('readline-sync');
var age = rLSync.question('What is your age? ');
var retirement = rLSync.question('At what age would you like to retire? ');
var year = new Date().getFullYear();
var workYearsLeft = retirement - age;

console.log(`It's ${year}. You will retire in ${year + workYearsLeft}.`);
console.log(`You have only ${workYearsLeft} years of work to go!`);

// Palindromic Strings Part 1

// Write a function that returns true if the string passed as an arg is a palindrome
// false otherwise
// Case and character sensitive

// Compare if the string is equal to the string reversed
// Use slice to create a shallow copy and then reverse it

function isPalindrome(string) {
  var reverseString = string.split('').reverse().join('');
  return string === reverseString;
}

// Palindromic Strings Part 2

// Write another function that returns true if the string passed as an arg is a palindrome
// false if otherwise
// Function should be case insensitive and ignore all non-alphanumeric chars

// Use replace to change all non-alphanum chars to '' and make string lower case
// Compare the same way as previously

function isRealPalindrome(string) {
  string = string.replace(/[\W_]/g, '').toLowerCase();
  return [...string].reverse().join('') === string;
}

// Palindromic Number

// Write a function that returns true if its integer arg is paldindromic
// False if otherwise

// Convert number to string
// Then call isPalindrome on it

function isPalindromicNumber(int) {
  return isPalindrome(String(int));
}

// Running Totals

// Write a function that takes an array on numbers
// Returns an array with same number of elements
// Each elements value being the running total from the original array

// Initialize an new array with the first number in it
// Use map to map new values where the value is current value plus previous index value
// if it's the first index just return the number

function runningTotal(array) {
  var totalsArray = [array[0]];
  if (array.length === 0) return []

  array.reduce(function(total, value) {
    totalsArray.push(total + value);
    return total + value;
  }, 0);

  return totalsArray;
}

// Use map

function runningTotal(array) {
  var i = 0;

  return array.map(element => {
    i += 1
    return array.slice(0, i).reduce((total, val) => total + val, 0)
  })
}

// Letter Swap

// Given a string of words separated by spaces
// Swap the first and last letters of each word
// Every word contains at least 1 letter and each string has one word

// split up the sentence into words
// use map to map the new words into an array and then join them together
// add the last letter to the middle of the word using slice and then add the first letter

function swap(string) {
  const words = string.split(' ');

  return words.map(word => {
    return word.length === 1 ? word : word.slice(-1) + word.slice(1, -1) + word[0]
  }).join(' ');
}

// Letter Counter Part 1

// Write a function that takes a string consisting of one or more space separated words
// Returns an object that shows the number of words of diff sizes

// Initialize an an empty object to use reduce
// Pass

function wordSizes(string) {
  if (!string) return {};
  
  return string.split(' ').reduce((sizes, word) => ({
    ...sizes,
    [word.length]: (sizes[word.length] || 0) + 1,
  }), {});
}

wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 1, "7": 2 }
wordSizes("What's up doc?");                              // { "2": 1, "4": 1, "6": 1 }
wordSizes('');                                            // {}

// Letter Counter Part 2

// Modify wordSizes to exclude non-letters when determining word size

// pass the word through a replace regex removing not word chars

function wordSizes(string) {
  const cleanWords = string.split(' ').map((string) => string.replace(/[\W_]/g, ''));
  if (!string) return {};

  return cleanWords.reduce((sizes, word) => ({
    ...sizes,
    [word.length]: (sizes[word.length] || 0) + 1,
  }), {});
}
