// Sum of Digits

// Write a function that takes on arg, pos int
// Return sum of its digits

// Use reduce to sum up the digits

function sum(int) {
  return String(int).split('').reduce((sum, val) => sum += Number(val), 0);
}

// Alphabetical Numbers

// Write a functiont hat takes an array of ints between 0 and 19
// Returns an array of those ints sorted based on english word of each num

// Create an array of number names starting from 'zero' to 'nineteen'
// Sort by the items english name

const NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
                    'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
                    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function alphabeticNumberSort(array) {
  return array.sort((a, b) => {
    if (a === b) return 0;
    return NUM_WORDS[a] > NUM_WORDS[b] ? 1 : -1;
  });
}

// Multiply All Pairs

// Write a function that takes two array args
// Each has list of nums
// Return new array containing products of all of the combinations of pairs
// Sort the array in ascending numerical order

// Use flat map to map each element into an array containing all possible products
  // w/ second array

// use map again with the second array transform each element by the product

const sortNumbers = (numbers) => numbers.sort((a, b) => a - b);

function multiplyAllPairs(arr1, arr2) {
  return sortNumbers(arr1.flatMap(val1 => arr2.map(val2 => val2 * val1)));
}

// Sum of Sums

// Write a function that takes an array of numbers
// Return the sum of the sums of each leading subsequence for that array

// Use reduce but add the total AND current number to the total

function sumOfSums(nums) {
  return nums.reduce((sum, num, idx) => {
    return sum + nums.slice(0, idx + 1).reduce((total, val) => total + val);
  });
}

// Leading Substrings

// Write a function that takes a string arg
// Returns a list of all substrings, start from beginning oft he string
// Ordered from shortest to longest

// Split up the string, and then transform with map
// the return of map will be slice(0, idx + 1)

function substrAtStart(string) {
  return [...string].map((_, idx) => string.slice(0, idx + 1));
}

// All Substrings

// Write a function that returns a list of all substrings of a string
// Order the returned by where in the string the substring begins
// All substrings that start at position 0 should come first, then position 1, etc.
// Return substrings at a given position from shortest to longest

// Use reduce to build up an array, each return will call substringsAtStart from the next position
// Use slice to slowly build through the string

function substrs(string) {
  return [...string].reduce((substrs, _, i) => [...substrs, ...substrAtStart(string.slice(i))], []);
}

// Palindromic Substrings

// Write a function that returns a list of all substrings of a string that are palindromic
// same chars forwards and backwards
// Order of palindromes should be in the order they appeared
// Include duplicate palindromes
// Case and char sensitive

// Use substrings to get list of substrings
// Use filter to return only those that are equal when called reverse on self
// Split up chars into array, reverse, then join

function palindromes(string) {
  return substrs(string).filter(str => str.length > 1 && str === [...str].reverse().join(''));
}

// Grocery List

// Write a function that takes a grocery list (two-dimensional arr)
// Each element contains fruit and quantity
// Return a one dimensoinal array of fruits
// in which each fruit appears the quantity number of times

// Flat map the grocery list
// Each element, use string repeat, then split up by spaces

function buyFruit(list) {
  return list.flatMap(item => `${item[0]} `.repeat(item[1]).split(' ').slice(0, item[1]));
}

// Iventory Item Transactions

// Write a function that takes two args
// Args --- iventoryItem, transactions
// Returns an array containing only the transactions for the specific inventoryItem

// Use filter to filter only the items who match the id

function transactionsFor(inventoryItem, transactions) {
  return transactions.filter(item => item.id === inventoryItem);
}

// Iventory Item Availability

// Write a function that reutrns true or false based on whether or not an
  // inventory item is available
// Args --- inventory item, transaction list
// Return true only if the sum of the quantity values of the items is more than 0
// a movement value of 'out' will decrease the quantity

// Use transactionsFor to get only the correct transactions for an item
// use reduce to tally up the quantities
// if item.movement === 'in' add the value, otherwise subtract

function isItemAvailable(item, transactions) {
  return (transactionsFor(item, transactions).reduce((total, item) => {
    return item.movement === 'in' ? total + item.quantity : total - item.quantity;
  }, 0)) > 0;
}
