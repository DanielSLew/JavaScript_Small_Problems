// Comparing Version Numbers

// Write a functiont hat takes any two vesion nums in format num.num.num....
// Compare the two vers and return 1 if ver1 > ver2, 2 if ver1 < ver2 and 0 if equal
// If either version number ontains chars other than digits and the . char return null
// Note 1.0 is the same as 1

// Test Cases:
compareVersions('1', '1.0') // 0
compareVersions('1.1.0.0', '1.1') // 0
compareVersions('1', '1.01') // -1
compareVersions('1.01', '1.1') // -1
compareVersions('1.1.18', '1.0.18') // 1
compareVersions('1.1.18', '1.18.1') // -1
compareVersions('11', '6.1') // 1
compareVersions('6.1', '11') // -1

compareVersions('1', '1');              // 0
compareVersions('1.1', '1.0');          // 1
compareVersions('2.3.4', '2.3.5');      // -1
compareVersions('1.a', '1');            // null
compareVersions('.1', '1');             // null
compareVersions('1..0.', '2.0');        // null
compareVersions('1.0', '1.0.0');        // 0
compareVersions('1.0.0', '1.1');        // -1
compareVersions('1.0', '1.0.5');        // -1

// Add guard clause to return null if any char other than digits and .
// Split up string by periods to get version numbers
// Iterate through the array of numbers
// Compare each index from both arrays,
  // Trim the leading 0s if necessary (if more than one char)
// If at any point it is smaller return -1, bigger return 1
// Else return 0 at the end of the function if it iterates through without issue

function compareVersions(ver1, ver2) {
  const invalidChars = (vers) => !vers.match(/^[0-9]+(\.[0-9]+)*$/);

  if (invalidChars(ver1) || invalidChars(ver2)) return null;
  let ver1Parts = ver1.split('.');
  let ver2Parts = ver2.split('.');
  let maxLength = Math.max(ver1Parts.length, ver2Parts.length);

  for (i = 0; i < maxLlength; i += 1) {
    if (Number(ver1Parts[i] || '0') > Number(ver2Parts[i] || '0')) return 1;
    if (Number(ver1Parts[i] || '0') < Number(ver2Parts[i] || '0')) return -1;
  }

  return 0;
}

// Clean Up SMS Messages

// Write a program that cleans up user-entered phone numbers so that they can be sent
  // as SMS messages
// Other than digits, the number may also contain special chars such as spaces, dots, dashes, parentheses
  // ignore these special chars

// Rules:
  // if phone number is less than 10 digits, assume bad number
  // if the phone number is 10 digits, assume that it is good
  // if the phone number is 11 digits and the first num is 1, trim the 1 and use last 10 digits
  // if the phone number is 11 digits, and first num is not one, it is a bad number
  // if the phone number is more than 11 digits, assume bad number
// for bad numbers return string of 10 '0's
// Return 10 digit string

// Test cases:

cleanUp('416-666-3121');             // '4166663121'
cleanUp('(416)666-3121');            // '4166663121'
cleanUp('1(416)666.3121');           // '4166663121'
cleanUp('416.666.3121');             // '4166663121'
cleanUp('(416)-.-666-.-3121');       // '4166663121'
cleanUp('1(416)666-312')             // '1416666312'
cleanUp('2(416)666-3121');           // '0000000000'
cleanUp('24166663121');              // '0000000000'
cleanUp('23-416-666-3121');          // '0000000000'
cleanUp('16-666-3121');              // '0000000000'
cleanUp('');                         // '0000000000'
cleanUp(4166663121);                 // '0000000000'

// Remove any non-digits
// Check if less than 10 numbers or more than 11 numbers - return bad num
// if 11 numbers, and begin with 1
  // return good number starting from second position
// if 10 nums - return good num

// Use replace to remove any non-digits, then check number using if conditions
// Have guard clause first that returns '00000000000' if any of invalid conditions are met

function cleanUp(stringNum) {
  const invalidNumber = '0000000000';
  if (typeof stringNum !== 'string') return invalidNumber;
  let cleanNum = stringNum.replace(/[^0-9]/g, '');

  if (cleanNum.length === 11 && cleanNum.startsWith('1')) return cleanNum.substring(1);
  if (cleanNum.length === 10) return cleanNum;

  return invalidNumber;
}

// Luhn Formula

// Simple checksum formula used to validate a variety of ID numbers (SIN, credit)
// Verifies a num against its included check digit, appended to a parial number
  // to generate a full number

// Number must pass this test:
  // Counting from the rightmost digit and moving left, double the value of every second digit
  // For any digit that thus becomes or more, subtract 9 from the result
    // 1111 => 2121
    // 8763 => 7733 (2*6 = 12 - 9 = 3, 2*8 = 16 - 9 = 7)
  // Add all these digits together
    // 1111 => 2121 => 6 (2+1+2+1)
    // 8763 => 7733 => 20 (7+7+3+3)
// If total ends in 0 (if checksum % 10 === 0) then num is valid
// Otherwise it is not valid

// Write a program that given a num in string format check if it is valid
// Ignore all non-numeric chars in the input string

validLuhnNum('2323 2005 7766 3554');        // true, 4343 4005 5736 6514 = 23 + 21 + 16 = 60 
validLuhnNum('1111');                       // false, 2121 = 6
validLuhnNum('0000');                       // true, 0000 = 0
validLuhnNum('999 fk-_999');                // false, 999999 = 54
validLuhnNum('004411');                     // false, 008421 = 15
validLuhnNum('054411');                     // true, 058421 = 20

// Clean up the numbers (use replace to keep only digits)
// Set a variable doubleNum = true
// Use reduceRight to iterate from the back to the front
  // Before adding the number to the total, reverse Doublenum
  // If doubleNum then add double of the string converted to a num
    // If the result is more than 9, subtract 9 before adding
  // Otherwise just add the string converted to a number to the running total
// Use modulo 10 on the return of reduceRight to check if checksum ends in 0

function validLuhnNum(stringDigits) {
  let cleanNum = stringDigits.replace(/\D/g, '');
  let doubleNum = true;

  return [...cleanNum].map(Number).reduceRight((checksum, num) => {
    doubleNum = !doubleNum;

    if (doubleNum) {
      num *= 2;
      num = (num > 9 ? num - 9 : num);
    }

    return checksum + num;
  }, 0);
}

// To get the number that you'll need to add to make the digit divisible by 10
// If valid return number unchanged, otherwise add a number to the end
// Add a dummy number 0 at the end, and then calculate the checksum, and grab the
  // Remainder of 10, that will be the number to add to the end


function calculateChecksum(digits) {
  let doubleNum = true;

  return [...digits].map(Number).reduceRight((checksum, num) => {
    doubleNum = !doubleNum;

    if (doubleNum) {
      num *= 2;
      num = (num > 9 ? num - 9 : num);
    }

    return checksum + num;
  }, 0);
}

function validateChecksum(stringDigits) {
  let cleanNum = stringDigits.replace(/\D/g, '');
  if (calculateChecksum(cleanNum) % 10 === 0) return cleanNum;

  let lastDigit = 10 - (calculateChecksum(cleanNum + '0') % 10);

  return cleanNum + String(lastDigit % 10); 
}

// Now I know my ABCs

// A collection of spelling blocks has two letters per block
// Write a function that takes a word string as an arg and returns true
  // if the word can be spelled using the set of blocks
  // false otherwise
  // Case insensitive

// Test Cases:

isBlockWord('BATCH');               // true
isBlockWord('BUTCH');               // false
isBlockWord('jest');                // true
isBlockWord('bkqpngrfjhvlz');       // true
isBlockWord('bkqpngrfjhvly');       // false

// Data:

// Represent the blocks as an array of arrays

// Algorithm
// create a const for the block letters [['B', 'O'], ...]
// Create a shallow copy of the block letters that we can mutate
// Iterate through the chars in the string word
// Check each letter against each array of letters, if we have a match
  // Delete the sub-array at the specific index, otherwise return false
// Return true after the iterations if all chars found a match

const spellingBlocks = [
  ['B', 'O'], ['X', 'K'], ['D', 'Q'], ['C', 'P'], ['N', 'A'], ['G', 'T'],
  ['R', 'E'], ['F', 'S'], ['J', 'W'], ['H', 'U'], ['V', 'I'], ['L', 'Y'],
  ['Z', 'M'],
]

function isBlockWord(word) {
  let letters = spellingBlocks.slice(0);

  return [...word.toUpperCase()].every(char => {
    let deleteCharsAt = Math.floor(letters.flat().indexOf(char) / 2);

    return deleteCharsAt === -1 ? letters.splice(deleteCharsAt, 1) : false;
  });
}

// Given list of nums in a short-hand range where only the significant part
  // of the next number is written beacuse we know the nums are always increasing
  // ex. "1, 3, 7, 2, 4, 1" represents [1, 3, 7, 12, 14, 21]
// "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" all represent [1, 2, 3, 11, 12]
// Range limits are inclusive

// Return a list of complete numbers
// Possible separators are ["-", ":", ".."]


rangeCreator("1, 3, 7, 2, 4, 1");       // [1, 3, 7, 12, 14, 21]
rangeCreator("1-3, 1-2");               // [1, 2, 3, 11, 12]
rangeCreator("1:5:2");                  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
rangeCreator("104-2");                  // [104, 105, 106, 107, 108, 109, 110, 111, 112]
rangeCreator("104-02");                 // [104, 105, ... 202]
rangeCreator("545, 64:11");             // [545, 564, 565, .. 611]
rangeCreator("0-2, 1:2, 5..7")          // [0, 1, 2, 11, 12, 15, 16, 17]

// Use regex to parse when there are range separators
  // match each number cluster (clusters separated by ',') using /\d+(([\-:]|\.{2})\d+)*/
  // Working w/ ['1', '3', '1-3', '1:2'] at this point
// Iterate through each of the range segments using reduce (each iteration will return an array)
// Have a seperate function that will find the numbers returned in said array
// Need to pass previous number, and current element being iterated on to new function

// getNumbers function:
  // Create results array
  // if the rangestr passed to Number() is not NaN (meaning it is single digit)
    // if digit greater than the previous number, add it to results, otherwise add 10**(previousNum.length)
      // until the number is greater than the previous number, and then add it to it.
  // Otherwise if NaN, we need to parse the numbers from the ranges (/\d+)
    // Grab the last element in the array as previous number
    // If the current range digit is greater than the previous number, add numbers to results until we get
      // to the next range number
    // If smaller than previous number, we need to add 10**(previousNum.length) to both numbers in the range cluster
      // Until the first num is larger
    // Then we can add each number to results until we get to the next range number
  // return the results array

// Use reduce to build up an array to be returned

function rangeCreator(rangeString) {
  let rangeArray = rangeString.match(/\d+(([\-:]|\.{2})\d+)*/g);

  return rangeArray.reduce((result, rangeSegment) => {
    return result.concat(getNumbers(result[result.length - 1], rangeSegment));
  }, []);
}

function getNumbers(prevNum, rangeStr) {
  if (Number(rangeStr)) return getCurrNum(prevNum, rangeStr);
  let rangeNums = getRangeNums(prevNum, rangeStr);
  let results = [];

  for (i = rangeNums[0]; i <= rangeNums[rangeNums.length - 1]; i += 1) {
    results.push(i);
  }

  return results;
}

function getRangeNums(prevNum, rangeStr) {
  let rangeNums = rangeStr.match(/\d+/g);

  rangeNums.forEach((num, idx) => {
    rangeNums[idx] = getCurrNum((rangeNums[idx - 1] || prevNum), num);
  });

  return rangeNums;
}

function getCurrNum(prevNum, numStr) {
  let num = Number(numStr);

  while (num < prevNum) {
    num += 10**(numStr.length);
  }

  return num;
}

// Rail Fence Cipher

// Implement encoding and decoding for the rail fence cipher
// The message is written downwards on successive "rails" of an imaginary fence
  // then moving up when we get to the bottom like a zig zag
// The message is read off in rows:
W . . . E . . . C . . . R . . . L . . . T . . . E
. E . R . D . S . O . E . E . F . E . A . O . C .
. . A . . . I . . . V . . . D . . . E . . . N . .
// then it becomes:
WECRLTEERDSOEEFEAOCAIVDEN

Encoding (string, number of rails)
// Build two functions, takes a plain text as a string and encodes it
// Another function takes a number for number of rails
Decoding (string, number of rails)
T.....s....
.H...e.s...
..I.m...a.e
...S.....g.

railFenceCiperEncode('WE ARE DISCOVERED FLEE AT ONCE', 3);     // WECRLTEERDSOEEFEAOCAIVDEN
railFenceCiperEncode('WE ARE DISCOVERED', 2);                  // WAEICVRDERDSOEE
railFenceCiperEncode('WE ARE DISCOVERED', 1);               // WEAREDISCOVERED
railFenceCiperEncode('THIS message', 4);                      // TsHesImaeSg
railFenceCiperEncode('WE ARE DISCOVERED', 1);               // WEAREDISCOVERED

// railFenceCiperEncode: (main function)
  // Create an array of x rails elements ([]) to map through 
  // iterate through each letter, and then add it to the next sub-array, railArray[i]
    // Once i reaches the last sub-array, work backwards through the indexes
    // add to index (numRails-1) times, then subtract from index (numRails - 1) times
      // This algorithm works after you manually add the first element.
    // Need to have a variable that switches between adding and subtracting every numRails-1 iterations
      // reverse = false;
      // if index % numRails-1 is 0 then reverse = !reverse
    // This will give us an Array [['T', 's'], ['H', 'e', 's'], ['I', 'm', 'a', 'e'], ['S', 'g']]
    // From here we just flatten and join.

function railFenceCipherEncode(message, numRails) {
  if (numRails <= 1) return message.replace(/\W/g, '');

  let msgArr = new Array(numRails).fill(undefined).map(_ => []);
  let reverse = false;
  let arrIdx = 0;

  [...message.replace(/\W/g, '')].forEach((char, idx) => {
    if (idx !== 0 && idx % (numRails - 1) === 0) reverse = !reverse;
    
    msgArr[arrIdx].push(char);
    reverse ? arrIdx -= 1 : arrIdx += 1;
  });

  return msgArr.flat().join('');
}

railFenceCiperEncode('THIS message', 4);                      // TsHesImaeSg

// Decode function:
  // receive an encodedMsg, and the number of rails
  // We need to find which rail the final digit was on, and then work backwards
  // To do this we can iterate through our msg with the same amount of times, then
  // save the final arrIdx (which will correspond to the rail number)
  // Then we can iterate through backwards with the same rule, prepending each letter
  // Into the corresponding sub-array, reversing when idx fits the same rules as before


// Need to find how many letters belonged to each rail, and which rail held the last char
// split the chars up into the appropriate char arrays depending on how many chars were from each rail

function railFenceCipherDecode(encodedMsg, numRails) {
  if (numRails <= 1) return encodedMsg;
  let [msgArr, reverse, arrIdx] = reverseEndingStateOfEncode(encodedMsg, numRails);
  msgArr = seperateMsgIntoRailsArr(msgArr, encodedMsg);

  let decodedMsg = '';
  let idxOffset = reverse ? -arrIdx : arrIdx;

  [...encodedMsg].forEach((char, idx) => {
    if ((idx + idxOffset) % (numRails - 1) === 0) reverse = !reverse;

    decodedMsg = msgArr[arrIdx].pop() + decodedMsg;
    reverse ? arrIdx -= 1 : arrIdx += 1;
  })

  return decodedMsg;
}

function seperateMsgIntoRailsArr(msgArr, encodedMsg) {
  let startIdx = 0;

  return msgArr.map((arr, i) => {
    startIdx += i === 0 ? 0 : msgArr[i-1].length;
    return encodedMsg.slice(startIdx, startIdx + msgArr[i].length).split(''); 
  });
}

function reverseEndingStateOfEncode(encodedMsg, numRails) {
  let msgArr = new Array(numRails).fill(undefined).map(_ => []);
  let reverse = false;
  let arrIdx = 0;

  [...encodedMsg].forEach((char, idx) => {
    if (idx !== 0 && idx % (numRails - 1) === 0) reverse = !reverse;
    reverse ? arrIdx -= 1 : arrIdx += 1;
    msgArr[arrIdx].push(null);
  });

  reverse ? arrIdx += 1 : arrIdx -= 1;
  reverse = !reverse;

  return [msgArr, reverse, arrIdx];
}

railFenceCipherDecode('TsHesImaeSg', 4)
railFenceCipherDecode('WECRLTEERDSOEEFEAOCAIVDEN', 3);     // WECRLTEERDSOEEFEAOCAIVDEN
railFenceCipherDecode('WAEICVRDERDSOEE', 2);                  // WAEICVRDERDSOEE
railFenceCipherDecode('WEAREDISCOVERED', 1);               // WEAREDISCOVERED
railFenceCipherDecode('TsHesImaeSg', 4);                      // TsHesImaeSg
railFenceCipherDecode('WE ARE DISCOVERED', 1);               // WEAREDISCOVERED
encoded = railFenceCiperEncode('THIS IS A LONG ENCODED MESSAGE WITH A LOT OF RAILS SO WE CAN TEST THIS OUT', 10);

railFenceCipherDecode(encoded, 10);

