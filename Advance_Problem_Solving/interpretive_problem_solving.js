// Diamonds

// Write a function that displays a four-pinted diamond in an n x n grid
// n is an odd integer supplied as an arg to the function
// Assume arg is always an odd int

// If n is 1, log 1 star
// int is also the number of rows logged
// Middle row is always the largest (containing n stars)

// Break problem into 3 steps, first half rows, middle row, second half rows (first half reversed)
// Half point is integer divided by 2 rounded down
// First half:
  // (half point number - row number - 1) of spaces
  // (row number - 1) * 2) + 1 number of stars
// Middle line:
  // n stars
// Second half:
  // Reverse first half and log

// Create an array of half point number elements to map through
// Transform each element into line of diamond (index will be row number - 1)
// Use repeat to repeat spaces or stars

function diamond(num) {
  if (num === 1) return console.log('*');

  let mid = Math.floor(num / 2);
  let firstHalf = [...new Array(mid)].map((_, idx) => ' '.repeat(mid - idx) + 
                                                      '*'.repeat(idx * 2 + 1));
  let diamond = firstHalf.concat('*'.repeat(num), firstHalf.slice().reverse());

  return console.log(diamond.join('\n'));
}

// Further Exploration

// To build a hollow diamond in each row other than the first we need to change the firstHalf
// First row will have one star as normal
// Second row will have one star, plus 1 space, plus one star
// Third row will have one star, plus 3 spaces, plus one star
// Fourth row will have one star plus 5 spaces plus one star
// etc.

// Include mid in first half, and then reverse a copy of array (excluding last ele)
// star, idx * 2 - 1 spaces, star

function hollowDiamond(num) {
  if (num === 1) return console.log('*');
  
  let mid = Math.floor(num / 2);
  let firstHalf = [...new Array(mid - 1)].map((_, idx) => {
    return ' '.repeat(mid - idx - 1) + '*' + ' '.repeat((idx + 1) * 2 - 1) + '*';
  });

  firstHalf.unshift(' '.repeat(mid) + '*');
  let midRow = '*' + ' '.repeat(num - 2) + '*';
  let diamond = firstHalf.concat(midRow, firstHalf.slice().reverse());

  console.log(diamond.join('\n'));
}

// More concise regex solution

function hollowDiamond(num) {
  console.log(diamond(num).replace(/(?<=\s*\*)\*+?(?=\*)/g, ' '));
}

// 1000 Lights
// Bank of switches before you numbered 1 to n
// Every switch is connected to exactly one light that initially off
// Toggle each switch on first walk
// Toggle every other switch on second walk
// Every every third switch on third walk, etc.
// Continue until you reach n repetitions

// Write a program that takes one arg (num of switches)
// Return and array of lights that are on after n repetitions

lightsOn(5);   // [1, 4]
lightsOn(100); // [1, 4, 9, 16, 25, 36, 49, 81, 100]
lightsOn(1);   // [1]
lightsOn(0);   // []
lightsOn(-1);  // []
lightsOn(2);   // [1]
lightsOn(3);   // [1]
lightsOn(4);   // [1, 4]

// Each of the returned, is a perfect square, so find each perfect square inclusive of n
// Perfect square is Math.sqrt(n) will return a whole number
  // To find if whole number, convert result to String, and parseInt, should be equal to each other
// Iterate through 1...n using for loop, pushing any number into that fits this condition to result array

function lightsOn(numLights) {
  let lightsOnArr = [];

  for (let i = 1; i <= numLights; i += 1) {
    if (Math.sqrt(i) === Math.ceil(Math.sqrt(i))) lightsOnArr.push(i);
  }

  return lightsOnArr;
}

// Caesar Cipher

// Write a function thqt implements the Caesar Cipher
  // Way to encrypt plaintext
  // Each letter in the text is subsituted by the letter located a given number of
    // positions away ('A' shifted 3 is 'D')
// Shift value is its key
// ciphertext can be decoded by using this key value

// Only encrypts letters (case insensitive)
// If the key value for shifting exceeds the length of the alphabet, it wraps around from beginning

caesarEncrypt('A', 0);        // 'A'
caesarEncrypt('A', 3);        // "D"
caesarEncrypt('AaAa', 3);     // "DdDd"
caesarEncrypt('abcdefghijklmnopqrstuvwxyz', 10);  // "klmnopqrstuvwxyzabcdefghij"

// Have a constant that represents the alphabet
// Need to iterate through each letter (with map, to transform)
  // ignore non a-z chars
// get the index of the letter as per the alphabet (will have to lowercase the letters)
// then we need to add the key to the index and get the remainder using the alphabet length
// This will give us the new position of the character in the index.
// We need to add the result of the new index - initial letter index to the charCode and return
// Combine the string at the end to return

function caesarEncrypt(text, key) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  return [...text.toLowerCase()].map((char, idx) => {
    let charIdx = alphabet.indexOf(char);
    if (charIdx === -1) return char;

    let newCharIdx = (charIdx + key) % (alphabet.length);
    return String.fromCharCode(text[idx].charCodeAt(0) + (newCharIdx - charIdx));
  }).join('');
}

// Vigenere Cipher

// Encrypts alpha text using polyalphabetic subs
// Series of Caesar Ciphers based on letters of a keyword
// Each letter of keyword is treated as a shfit value
// Ie. 'B' => shift value of 1, 'd' => shift alue of 3
// The shift value used for a letter is equal to its index value in the alphabet
// 'a'-'z' maps to 0-25, case insensitive
// Apply the cipher is sequential for each char
  // Ie the key is the letter, and the keyword maps to each letter inthe text
  // If key is 4 letters, and the text has 12 letters, the key woudl repeat 3 times
  // non letter chars are ignored

text = 'hello how do you do today?'
keyword = 'lake' // keys of 11, 0, 10, 4
// h => 11, e => 0, l => 10, l => 4, o => 11, h => 0....

vigenereCipher(text, keyword);       // sevpz h.....

// Initialize a constant for the alphabet
// Map the keyword to an array of key numbers (based on alphabet index) [10, 0, 10, 4]

// Iterate through the text, converted to lowercase first (using map w/ idx to transform)
// Find the char idx from the alphabet
// return the char if not a letter
// other find rotated char index in the alphabet by adding the key from array
  // To find which key to use, use idx of iteration % keyArray length
  // 0, 1, 2, 3, 4(becomes 0), 5(becomes 1), etc.
// Then find the remainder using alphabet length to wrap letter around alphabet
// Add the difference of newidx - oldIdx to teh charCode and return it
  // Will need to use the original text to find original charCode to keep case

function vigenereCipher(text, keyword) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let keys = [...keyword.toLowerCase()].map(c => alphabet.indexOf(c));
  let advanceKey = 0

  return [...text.toLowerCase()].map((char, idx) => {
    let charIdx = alphabet.indexOf(char);
    if (charIdx === -1) return char;

    let newCharIdx = (charIdx + keys[advanceKey % keys.length]) % alphabet.length;
    advanceKey += 1;
    return String.fromCharCode(text[idx].charCodeAt(0) + (newCharIdx - charIdx));
  }).join('');
}

// Seeing Stars

// Write a function that displays an 8 pointed star in an n x n grid
// Arg -- n (odd int, 7 or more)

star(7);
// logs
*  *  *   0 spaces, 1 star, 2 spaces, 1 star, 2 spaces, 1 star
 * * *    1 space,  1 star, 1 space,  1 star, 1 space,  1 star
  ***     2 spaces, 1 star, 0 spaces, 1 star, 0 spaces, 1 star
*******   7 stars (n)
  ***     First half reversed
 * * *
*  *  *
// First half has Math.floor(n/2) elements
// Spaces after the first star is inverse of spaces before
// 0 - 2 - 2
// 1 - 1 - 1
// 2 - 0 - 0
// first set of spaces will be idx repeated, 
// second and third set of spaces will be (length of first half) - index + 1 repeated
// Pattern will be spaces, star, spaces, star, spaces, star

// Then log n stars
// Then log the first half reversed

function star(n) {
  let firstHalf = new Array(Math.floor(n / 2)).fill(null);

  firstHalf = firstHalf.map((line, idx) => {
    let spaces = ' '.repeat(firstHalf.length - idx - 1);
    return `${' '.repeat(idx)}*${spaces}*${spaces}*`;
  });

  console.log(firstHalf.concat('*'.repeat(n), firstHalf.slice().reverse()).join('\n'));
}


