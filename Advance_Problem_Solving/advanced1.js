// Madlibs Revisited

// Build a madlibs program that takes a template as input
// plugs in a selection of randomized nouns, verbs, adjectives, and adverbs into that text
// Return that text
// Build the nouns, verbs, etc. directly into your program

// Read the text and find a word corresponding to the appropriate text when needed
// Words that have been injected appear in double quotes

madlibs(template);          // The "fox" "bites" the "dog"'s "tail"

// The replacement words can be represented in an object
// { noun: fox dog head leg tail cat,
//   verb: jumps lifts bites lick pats,
//  etc.}

// The template will be formatted like 'The "noun" "verb" the "noun"'s "noun"'
// We can then use string replace, which will replace any of the obj's keys
// With a randomly chosen word (Use Math.floor(Math.random() * Math.floor(key.length)))
// This will return a random index which will correspond to the array of words as the key's values

const wordList = {
  adjectives: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry'],
  nouns: ['fox', 'dog', 'head', 'leg', 'tail', 'cat'],
  verbs: ['jumps', 'lifts', 'bites', 'licks', 'pats'],
  adverbs: ['easily', 'lazily', 'noisily', 'excitedly'],
}

let template1 = 'The "adjectives" brown "nouns" "adverbs" "verbs" the "adjectives" yellow "nouns", who "adverbs" "verbs" his "nouns" and looks around.';
let template2 = 'The "nouns" "verbs" the "nouns"\'s "nouns".';

function madlibs(template) {
  const randomWord = (words) => words[Math.floor(Math.random() * Math.floor(words.length))];
  const regExp = new RegExp('\"(' + Object.keys(wordList).join('|') + ')\"', 'g')
  
  return template.replace(regExp, (_, type) => `"${randomWord(wordList[type])}"`);
}

// Transpose 3x3

// Can be represented by an array of arrays (an outer array w/ 3 sub-arrays w/ 3 elements each)
1 5 8
4 7 2
3 9 6
let matrix = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6],
];

let matrixTransposed = [
  [1, 4, 3],
  [5, 7, 9],
  [8, 2, 6],
];

// Transpose a 3x3 array and return the transposed array (do not mutate the original)
// Need to transform the original array and preserve # of elements & nested arrays(use map)
// First row will become first column [0][0], [1][0], [2][0], etc.
  // We will need to map through the outer array
  // then we need to map through the subarray returning each element as [indexInner][indexOuter]
// Return the array that map returns

function transpose(matrix) {
  return matrix.map((row, rowIdx) => row.map((val, colIdx) => matrix[colIdx][rowIdx]);
}

// Transpose MxN

// A matrix not limited to 3x3
// Adjust the solution avbove to handle any size of matrix w/ at least one row and one column

transpose([[1, 2, 3, 4]]);          // [[1], [2], [3], [4]]
transpose([[1], [2], [3], [4]]);    // [[1, 2, 3, 4]]
transpose([[1]]);                   // [[1]]
transpose([[3, 2, 4, 5, 1], [4, 5, 2, 5, 1], [9, 8, 7, 6, 5]]);
// [[3, 4, 9], [2, 5, 8], [4, 2, 7], [5, 5, 6], [1, 1, 5]]

// Need to figure out how many columns (num of elements per row)
// Create an array of that many nested arrayed filled with number of elements of matrix.length (rows)

// map through both and use the same process as before

function transpose(matrix) {
  let newMatrix = new Array(matrix[0].length).fill(null)
           .map(_ => new Array(matrix.length).fill(null));

  return newMatrix.map((row, rowIdx) => row.map((_, colIdx) => matrix[colIdx][rowIdx]));
}

// Rotating Matrices

// a 90 deg rotation of a matrix produces a new matrix in which each side of the
  // matrix is rotated clockwise by 90 degs

1 5 8
4 7 2
3 9 6
// becomes
3 4 1
9 7 5
6 2 8

// We can use the same solution, except create a shallow copy of the original matrix
  // and then reverse it
// The pattern is that we map backwards through the initial outer array

function rotate90(matrix) {
  let newMatrix = new Array(matrix[0].length).fill(null)
           .map(_ => new Array(matrix.length).fill(null));
  let matrixCopy = matrix.slice().reverse();

  return newMatrix.map((row, rowIdx) => row.map((_, colIdx) => matrixCopy[colIdx][rowIdx]));
}

// Merge Sorted Lists

// Write a function that takes two sorted arrays as arg
// Return a new array that contains all the elements from both input arrays in sorted order
// Do not use sort, build the result array up one at a time
// Do not mutate the input array

merge([1, 5, 9], [2, 4, 7]);      // [1, 2, 4, 5, 7, 9]
merge([1, 1, 3], [2, 2]);         // [1, 1, 2, 2, 3]
merge([], [1, 4, 5]);             // [1, 4, 5]
merge([1, 4, 5], []);             // [1, 4, 5]

// Need to take the first array, then create a function that will
  // input an element into the array, and move all elements down one
  // It will take the array, idx, and value
  // slice up to the current idx (0, idx), concat w/ new value, and then slice from current idx to the end.
// We will input an element into the array in the current idx if
  // it is less than or equal to the current element

function merge(arr1, arr2) {
  let mergeArr = arr1.slice();
  let arr2Copy = arr2.slice();
  let offset = 0;

  arr1.forEach((val1, idx1) => {
    arr2.slice(offset).forEach((val2, idx2) => {
      if (mergeArr[idx1 + offset] <= val2 && val2 <= mergeArr[idx1 + offset + 1]) {
        mergeArr.splice(idx1 + offset, 0, arr2Copy.splice(idx2 - offset, 1)[0]);
        offset += 1;
      }
    });
  });

  return mergeArr.concat(arr2Copy);
}

merge([1, 5, 9], [2, 6, 8]);      // [1, 2, 4, 5, 7, 9]

// Merge Sort

// A recursive sorting algorithm that breaks down an array's elements into nested subarrays
// Combining those nested subarrays back together in sorted order

// use merge method from last solution to sort the pairs of nested arrays
[9, 5, 7, 1]
[[9, 5], [7, 1]]
[[[9], [5]], [[7], [1]]]
[[5, 9], [1, 7]]
[1, 5, 7, 9]

function merge(array1, array2) {
  var copy1 = array1.slice();
  var copy2 = array2.slice();
  var result = [];

  while (copy1.length > 0 && copy2.length > 0) {
    result.push(copy1[0] <= copy2[0] ? copy1.shift() : copy2.shift());
  }

  return result.concat(copy1.length === 0 ? copy2 : copy1);
}

// Split up elements into two halves over and over again, the array just has one element
// slice(0, a.length/2), slice(a.length/2) will give the first half and second half
// Use this recursively until a.length is 1

// Then we can merge recursively until the current array has the same number of elements as the original array

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  return merge(mergeSort(arr.slice(0, arr.length / 2)), mergeSort(arr.slice(arr.length / 2)))
}

// Binary search

// Search cuts search area in half on each iteration by discarding the half that you know
  // Your search term doesn't exist in
  // Relies on this by relying on the data being sorted
// Binary search finds the middle value, if the middle value is equal to the search, stop search
// If it is less than search, discard the lower half including the middle value
// If it is greater than search, discard the upper half, and repeat search

// Implement a binarySearch function that takes an array and a searchItem as args
// returns the index of searchItem if found or -1 otherwise
// assume array is sorted

search for 2
[1, 2, 3, 4, 5, 6, 7]
checks if 2 === 4
checks if 2 > 4, it is not, so then we discard 4, 5, 6, 7
[1, 2, 3]
checks if 2 === 2
return index

// find midpoint by using Math.floor(arr.length / 2)
// check the conditions
// if we discard the bottom half, we need to count those elements and add it to an offset
// when we return the index at the end
  // To get number of elements we can use arr.splice(0, mid).length
  // This will remove the elements and give us the length of those removed
  // Add this number to the offset
// return -1 if arr.length === 1
// Use recursion for this function

function binarySearch(arr, search) {
  let arrCopy = arr.slice();
  let mid = Math.floor(arr.length / 2);
  let idxOffset = 0;

  if (arr[mid] === search) return mid;
  if (arr.length === 1) return -1;

  arr[mid] < search ? idxOffset += arrCopy.splice(0, mid).length : arrCopy.splice(mid);

  let idx = binarySearch(arrCopy, search);
  return idx === -1 ? idx : idx + idxOffset;
}


