// Uppercase Check

// Write a function that takes a string arg
// Returns true if all of the alphabetic chars inside the string are uppercase
// False otherwise

// We can compare the input to the input uppercased

function isUppercase(string) {
  return string === string.toUpperCase();
}

// Delete Vowels

// Write a function that takes an array of string
// Returns an array of the sae string values w/o vowels

// Use replace and regex to remove vowels
// Map through to transform the strings

function removeVowels(array) {
  return array.map(string => string.replace(/[aeiou]/gi, ''));
}

// Lettercase Count

// Write a function that takes a string
// Returns an obj containing three properties
  // lowercase, uppercase, and neither counts

// Split up the string into chars
// Use reduce to iterate through and build up an object

function letterCaseCount(string) {
  return [...string].reduce((count, char) => {
    if (/[a-z]/.test(char)) {
      count.lowercase += 1;
    } else if (/[A-Z]/.test(char)) {
      count.uppercase += 1;
    } else {
      count.neither += 1;
    }
    return count;
  }, {lowercase: 0, uppercase: 0, neither: 0});
}

// Capitalize Words

// Write a function that takes a string as an arg
// Returns that string w/ first char of every word capitalized
  // and all other letters lowercase

// Split up string by spaces
// Use map to transform the words
// take the first char and capitalize, then add rest of chars to word (substr)

function wordCap(string) {
  return string.split(' ')
               .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ');
}

// Swap Case

// Write a function that takes a string as an arg
// Returns that string w/ every lowercase letter changed to uppercase nad vice versa

// Split string into chars then map through to transform
// If char matches lowercase, make uppercase, otherwise make lowercase
// Join together and return

function swapCase(string) {
  return [...string].map(char => /[a-z]/.test(char) ? char.toUpperCase() : char.toLowerCase())
                    .join('');
}

// Staggered Caps Part 1

// Write a function that takes a string as an arg
// Returns that string w/ a staggered capitalization
// First and every other char is capitalized, all other chars will be lowercased
// Count non-letter chars in the counting scheme

// Map through with index, if index is even, uppercase, otherwise lowercase

function staggeredCase(string) {
  return [...string].map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
                    .join('');
}

// Staggered Caps Part 2

// Modify the previous exercise so it ignores non-alphabetic chars

// Have a working index that only increases when the char is a letter

function staggeredCase(string) {
  let uppercase = false;

  return [...string].map(char => {
    if (/[a-z]/i.test(char)) {
      uppercase = !uppercase;
      return uppercase ? char.toUpperCase() : char.toLowerCase();
    }
    
    return char;
  }).join('');
}

// How Long Are You

// Write a function that takes a string as an arg
// Returns an array that contains every word from the string
  // with each word followed by a space and then words length
// If empty string or no arg, return an empty array

// Guard clause to return an empty array unless string
// Split up string into words then use map to transform by appending the length

function wordLengths(words) {
  if (!words) return [];
  return words.split(' ').map(word => word + ' ' + String(word.length));
}


// Search Word Part 1

// Write a functinot hat takes a word and a string of text as args
// Returns an int representing to the number of times the word appears in text

// Use match() to return an array of the matches and then get the length property

function searchWord(word, text) {
  if (!word || !text) return 0;

  let matches = text.match(new RegExp(`\\b${word}\\b`, "gi"));
  return matches ? matches.length : 0;
}

// Search Word Part 2

// Write a function that takes a word and a string of text as args
// Returns the text with every instance of the word highlighted
  // Add **WORD** to highlight word

// Use replace to find instances of word and uppercase and add asterisks

function searchWord(word, text) {
  if (!word || !text) return -1;

  return text.replace(new RegExp(`\\b${word}\\b`, "gi"), `**${word.toUpperCase()}**`);
}
