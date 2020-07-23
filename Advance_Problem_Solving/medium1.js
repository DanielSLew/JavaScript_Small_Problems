// Rotation Part 1

// Write a function that rotates an arr by moving the first element to end of the arr
// Do not mutate original array
  // If input is not an arr return undefined
  // if input is an empty arr return an empty arr

rotateArray([1, 2, 3, 4, 5]);       // [2, 3, 4, 5, 1]
rotateArray([1, 'b', 3, 'a', 5]);   // ['b', 3, 'a', 5, 1]
rotateArray([0]);                   // [0]
rotateArray([]);                    // [2, 3, 4, 5, 1]
rotateArray({ 1: 2, 3: 4 });        // undefined
rotateArray('[1, 2, 3, 4, 5]');     // undefined
arr = [1, 2, 3, 4, 5];
rotateArray(arr);                   // [2, 3, 4, 5, 1]
arr;                                // [1, 2, 3, 4, 5]

// Take the array, slice all elements except the first
// concat the result with the first element of original array and return

function rotateArray(arr) {
  if (!Array.isArray(arr)) return;
  if (arr.length === 0) return [];

  return arr.slice(1).concat(arr[0]);
}

// Rotation Part 2

// Write a function that rotates the last n digits of a number
// For the rotation, rotate by one digit to the left, moving the first digit to the end

rotateRightmostDigits(123456, 0);      // 123456
rotateRightmostDigits(123456, 1);      // 123456
rotateRightmostDigits(123456, 2);      // 123465
rotateRightmostDigits(123456, 3);      // 123564
rotateRightmostDigits(123456, 4);      // 124563
rotateRightmostDigits(123456, 5);      // 134562
rotateRightmostDigits(123456, 6);      // 234561

// Turn the number into a string, spit up the chars into an array
// Use slice to pass a portion of the array to get reversed
  // array.length - rotationAmount
  // Ie 6(length) - 1(rotation) would pass [6] and return [6]
  //    6(length) - 2(rotation) would pass [5, 6] and return [6, 5]
  //  etc.
// Join together the first elenments up to length - rotation, and then use the result
// that we previously got to concat both arrays then join and turn into a Number

function rotateRightmostDigits(num, rotAmt) {
  let numArray = String(num).split('');
  let digitsSliced = numArray.length - rotAmt;

  let rotArray = numArray.slice(0, digitsSliced).concat(rotateArray(numArray.slice(digitsSliced)));

  return parseInt(rotArray.map(String).join(''));
}

// Rotation Part 3

// Take the number 735291 and rotate it by one digit to the left
// Keep the first digit fixed in place and rotate the remaining digits
// Keep the first two digits fixed in place and rotate the remaining digits, etc

maxRotation(735291);       // 321579
maxRotation(1);            // 1
maxRotation(35);           // 53
maxRotation(105);          // 15
maxRotation(8703529146);   // 7321609845

// Turn the number into a String
// We need to iterate through the string.length times (so just the string itself)
// Each iteration use slice to return the first portion, and the second rotated portion
  // slice(0, idx) + rotate(slice(idx))
    // rotate will return string.slice(1) + string[0]
  // On each iteration reassign the string that we're mutating
// Return the string converted to Number at the end

function maxRotation(num) {
  let numString = String(num);

  [...numString].forEach((_, idx) => {
    numString = numString.slice(0, idx) + (numString.slice(idx + 1) + numString[idx]);
  });

  return parseInt(numString, 10);
}

// Stack Machine Interpretation

// A stack is a list of vlues that grows and shrinks dynamically
  // May be implemented as an Array that uses two Array methods (push/pop)

// Register is the current value (not part of stack)
// Operations that require two values, pops the topmost item from the stack
  // Operates on the popped value and the register value and then stores the result in the register
// MULT - multiples stack val w/ register val, removes value from stack, stores result in register

// Write a function that implements a stack and reg based programming language
  // n => place value n in register
  // PUSH => push the register value onto the stack
  // ADD => pop a value from the stack, add it to the register
  // SUB => Pop stack subtract from reg
  // MULT => Same but multiply
  // DIV => Same but divide (store the integer result)
  // MOD => same but modulo (store integer remainder of division)
  // POP => Remove the topmost item from the stack and place it in the register
  // PRINT => PRint the register value

// Initialize stack to [] and register to 0
// Assume all programs are valid

// Split up commands, and then iterate through commands
// Use a switch statement to check each token against the possible command
  // If the token matches the condition, do the command

function minilang(tokens) {
  let stack = [];
  let register = 0;

  tokens.split(' ').forEach(token => {
    if (token.match(/\d+/)) return register = parseInt(token, 10);
    switch (token) {
      case 'PUSH':
        stack.push(register);
        break;
      case 'ADD':
        register += stack.pop();
        break;
      case 'SUB':
        register -= stack.pop();
        break;
      case 'MULT':
        register *= stack.pop();
        break;
      case 'DIV':
        register = Math.floor(register / stack.pop());
        break;
      case 'MOD':
        register = register % stack.pop();
        break;
      case 'POP':
        register = stack.pop();
        break;
      case 'PRINT':
        console.log(register);
        break;
      default:
        throw `Error: Bad token ${token}!`
        break;
    }
  });
}

// Word to Digit

// Write a function that takes a sentence string as an arg
// Returns that string with every occurence of a number word converted to a digit
// Only change full words, not partial words (like freight)
// create an array of ['zero', .... 'nine']

wordToDigit('Hi hello zero one');       // 'Hi hello 0 1'
wordToDigit('Call me at five five five two six one nine');       // 'Call me at 5 5 5 2 6 1 9'
wordToDigit('onezero');                 // 'onezero'
wordToDigit('This freight is eight');   // 'This freight is 8'
wordToDigit('Hi hello zero one');       // 'Hi hello 0 1'

// Create a const Array that will map the word to its index ('zero' => 0)
// Iterate through the words using map
  // Use replace on the word
  // Pass a pattern that looks for the index of the word in stringDigits of numbers joined together
  // If found return the String(index)
// Join together the result of map with ' ' and return

function wordToDigit(string) {
  const stringDigits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  return string.split(' ').map(word => {
    let idx = stringDigits.indexOf(word)
    return idx === -1 ? word : String(idx);
  }).join(' ');
}
const NUM_WORDS = {
  zero:  0,
  one:   1,
  two:   2,
  three: 3,
  four:  4,
  five:  5,
  six:   6,
  seven: 7,
  eight: 8,
  nine:  9,
};

function wordToDigit(string) {
  let regExp = new RegExp('\\b' + Object.keys(NUM_WORDS).join('|') + '\\b', 'g');
  return string.replace(regExp, (match) => NUM_WORDS[match]);
}

// Fibonacci Numbers (Recursion)

// sequences of numbes in which each number is the sum of the previous two nums
// First two fib nums are 1 and 1, third num is 2 (1 + 1), 3 (1 + 2), 5 (2 + 3), etc

F(1) = 1
F(2) = 1
F(n) = F(n - 1) + F(n - 2) where n > 2

// For example a recursive function that sums numbers
function sum(n) {
  if (n === 1) return 1;
  
  return n + sum(n - 1);
}

// Recursive functions have 3 qualities
  // 1. Call itself at least once
  // 2. It has an ending condition (ie if (n === 1))
  // 3. The result of each recursion are used in each step ie n +sum(n-1) uses sum(n - 1)

// Write a recursive function that computes the nth Fib num where nth is an arg passed to function

fibonacci(1);         // 1
fibonacci(2);         // 1
fibonacci(3);         // 2
fibonacci(4);         // 3
fibonacci(5);         // 5
fibonacci(12);        // 144
fibonacci(20);        // 6765

// We need to recursively call fib inside the function
// Have a return condition where if n is 2 or less return 1
// Call fib passing in the current number - 1

function fibonacci(n) {
  if (n <= 2) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Fibonacci Numbers (Procedural)

// Rewrite fibonacci function so that it computes w/o recursion
// In this case, we need to compute n iterations to figure and calculate them one at a time
// We can use reduce to build up the fib number
// use the first num as the starting point, fill a n number array with 1 values

function fibonacci(n) {
  if (n <= 2) return 1;
  let [nextNum, prevNum] = [1, 1];

  return new Array(n - 1).fill(1).reduce((result, num) => {
    currNum = result + prevNum;
    prevNum = result;
    return currNum;
  });
}

// Fibonacci Numbers (Memoization)
// Memoization is an approach that invovles saving a computed answer for future resuse
  // instead of computing it from scratch every time it is needed
  // In the case of recursive fib function, using memoization saves calls to 
  // fibonacci(nth -2) because the necessary values have already been computed by
  // the recursive calls to fibonacci(nth - 1)
// Refactor the resursive fib soluition to use memoization

const fibTable = {};

function fibonacci(n) {
  if (n <= 2) return 1;
  if (fibTable[n]) return fibTable[n];

  return (fibTable[n] = fibonacci(n - 2) + fibonacci(n - 1));
}


