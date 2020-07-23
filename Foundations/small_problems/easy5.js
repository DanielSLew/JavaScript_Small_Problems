// Write a function that takes a string
// Doubles every char in the string and returns the new string

// Split up the string, map over the characters adding double chars, and then join together

function repeater(string) {
  return [...string].map(char => char + char).join('');
}

// Double Char Part 2

// Write a function that takes a string, doubles every consonant char in str
// Returns the result as new string
// Double everything other than vowels, digits, whitespace, etc.

// Map through each char, add char to char.replace if it's not a consonant replace it with ''

const keepConsonant = (char) => (char.replace(/[aeiou]|[^b-z]/i, ''));

function doubleConsonants(string) {
  return [...string].map(char => char + keepConsonant(char)).join('');
}

// Reverse Number

// Write a function that takes a pos int
// Returns num with digits reversed

// Use String() to convert to string, split the string, reverse, join together and convert to number

function reverseNumber(num) {
  return Number([...String(num)].reverse().join(''));
}

const reverseNumber = (num) => Number([...String(num)].reverse().join(''));

// Get the Middle Character

// Write a function that takes a non-empty str arg
// Returns middle char of string
// If string has odd length, return one char, if even length return 2 chars

// Find the middle length using length / 2 and Math.floor
// If even number, slice to mid + 1, else slice to mid

function centerOf(string) {
  const mid = Math.floor(string.length / 2);
  return (string.length % 2 === 0 ? string[mid - 1] : '') + string[mid];
}

// Always Return Negative

// Write a function that takes a number as an arg
// If num is pos return negative num
// If negative return as is

// Use Math.abs to make the number positive and add anegative sign

const negative = (num) => -Math.abs(num);

const negative = (num) => num >= 0 ? num : -num;

// Counting Up

// Write a function that takes an integer arg
// Returns an array containing all ints between 1 and the arg inclusive, in ascending order

// Fill an array with 5 default values and then reduce to build an array

const sequence = (num) => Array(num).fill(null).map((_, idx) => idx + 1);

// Name Swapping

// Write a function that takes a string arg
// Arg has first name a space and last name
// Return a new string consisting of last name, comma, space, first name

// split up names by space, then reverse, join together

const swapName = (name) => name.split(' ').reverse().join(', ');

// If more than one first name:
// Need to just move the last item to the first

function swapName(name) {
  let names = name.split(' ');
  return names[names.length - 1] + ', ' + names.slice(0, -1).join(' ');
}

// Sequence Count

// Create a function that takes two ints as args
// Args --- count, starting num of sequence
// Return an array containing same num of elements as the count arg
// Value of each element is multiple of startingnum

// Assume count is always 0 or more, starting num can be anything

// Create an empty array to iterate over
// map the current idx + 1 multiplied by the starting num

function sequence(count, startNum) {
  return [...Array(count).keys()].map(idx => (idx + 1) * startNum);
}

// Reverse It Part 1

// Write a function that takes a string arg
// Returns new string w/ words from the string arg in reverse order

// Split string by spaces, reverse, and join together w/ spaces

const reverseSentence = (string) => string.split(' ').reverse().join(' ');

// Reverse It Part 2

// Write a functino that takes a string arg
// Returns new string containing words from the string arg

// If five or more letters in word, letters are reverse
// Split string, map through, if word.length is 5 or more, reverse the word

function reverseWords(words) {
  return words.split(' ').map(word => {
    return word.length >= 5 ? [...word].reverse().join('') : word;
  }).join(' ');
}

