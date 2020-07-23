// Lettercase Percentage Ratio

// Write a function that takes a string
// Returns an object containing the following:
  // Percentage of chars in the string that are lowercase letters
  // % of chars that are uppercase
  // % of chars that are neither

// Assume the string will always contain at least one char

letterPercentages('123 aBc-'); // { lowercase: "25.00", uppercase: "12.50", neither: "62.50" }
letterPercentages('abc');      // { lowercase: "100.00", uppercase: "0.00", neither: "0.00" }
letterPercentages('-=+"AB');   // { lowercase: "0.00", uppercase: "33.33", neither: "66.66" }
letterPercentages('a');        // { lowercase: "100.00", uppercase: "0.00", neither: "0.00" }

// Represent this data as an object
// Iterate through the characters, adding counts to an object (use reduce)
//  convert each count to a percentage (string.length / count)
  // Call to fixed(2) to convert to a string and keep 2 decimal places

function letterPercentages(string) {
  const getPercent = (pat) => (((string.match(pat) || []).length / string.length) * 100).toFixed(2);

  return { 
    lowercase: getPercent(/[a-z]/g), 
    uppercase: getPercent(/[A-Z]/g), 
    neither: getPercent(/[^A-Z]/gi),
  }
}

// Triangle Sides

// Triangle is classified as follows
  // Equilateral (3 sides equal length)
  // Isoceles (two sides equal length)
  // Scalene (all sides diff length)

// To be a valid triangle, sum of the lengths of the two shortest sides > length of longest
// Every side must also have a length greater than 0
// Otherwise it is invalid

// Write a function that takes the lengths of three sides of a triangle as args,
  // returns one of the triangle classifications as strings

triangle(0, 3, 3);      // 'invalid'
triangle(1, 2, 3);      // 'invalid'
triangle(2, 3, 4);      // 'scalene'
triangle(95, 1, 1);     // 'invalid'
triangle(1, 1, 1);      // 'equilateral'
triangle(NaN, 2, 3);    // 'invalid'
triangle(110, 55, 55);  // 'invalid'
triangle(110, 55, 56);  // 'scalene'
triangle(2, 3, 2);      // 'isoceles'

// Use an if statement to return triangle type
// sort sides by number size (use sort function w/ callback)
// if sides[0] + sides[1] > sides[2] or check the index of 0 (is above -1)in the arr, return 'invalid'
// else if side[0] === side[1] === side[2]
  // return 'equilateral'
// else if
  // index of the first char sliced is 0 return 'scalene'
// otherwise return 'scalene'

function triangle(...sides) {
  sides.sort((a, b) => a - b);

  if (sides[0] + sides[1] <= sides[2] || sides.includes(0)) return 'invalid';
  if (sides[1] === sides[2]) return 'equilateral';
  return sides[0] === sides[1] ? 'isoceles' : 'scalene';
}

// Tri-Angles

// 4 classifications of triangles:
  // Right: one angle is exactly 90 deg
  // acute: all three angles are less than 90 deg
  // obtuse: one angle is greater than 90 deg
  // invalid: sum of angles is not 180 or one of the angles is 0 deg

// Write a function that takes three angles of a triangles as args, returns one of the classes as string
// Assume all angles have int values, do not worry aout floating point errors

// Check invalid condition first (return invalid)
// Check if the angles includes 90 (return right)
// check if the Math.max angle is more than 90 (return obtuse)
// otherwise return acute

triangle(0, 90, 90);           // 'invalid'
triangle(1, 89, 90);           // 'right'
triangle(2, 89, 89);           // 'acute'
triangle(1, 88, 91);           // 'obtuse'
triangle(60, 60, 60);          // 'acute'
triangle(20, 40, 120);         // 'obtuse'
triangle(70, 35, 75);          // 'acute'
triangle(70, 36, 75);          // 'invalid'
triangle(70, 34, 75);          // 'invalid'

function triangle(...angles) {
  if (angles.reduce((s, a) => s + a) !== 180 || angles.includes(0)) return 'invalid';
  if (angles.includes(90)) return 'right';
  return Math.max(...angles) > 90 ? 'obtuse' : 'acute';
}

// Unlucky Days

// Write a function that takes a year as an arg
// Returns the number of Friday the 13ths in that year
// Assume year is greater than 1752

fridayThe13ths(1986);           // 1
fridayThe13ths(2015);           // 3
fridayThe13ths(2017);           // 2

// Iterate through the 13ths of the year, and figure out if the day is a friday
// Friday is a 5 when we return day of the week
// Initialize a new date object using the year arg, 1 (for month) and 13 (for day)
// Iterate through 12 times advancing the month each time (w/ map)
  // Use set month and pass the current index) for the month
  // return true if the current day is a friday
// Filter days for true values and return the length

function fridayThe13ths(year) {
  return [...'.'.repeat(12)].reduce((count, _, idx) => {
    return new Date(year, idx, 13).getDay() === 5 ? count + 1 : count;
  }, 0);
}


// Next Featured Number Higher than a Given Value

// Featured number is an odd number that is a multiple of 7
  // with all of its digits occuring exactly once
  // 49 is featured number, 98 is not (even num), 133 is not (3 appears twice)

featured(12);         // 21
featured(20);         // 21
featured(21);         // 35
featured(997);        // 1029
featured(1029);       // 1043
featured(999999);     // 1023547
featured(999990987);  // 1023456987

// First find the next multiple of 7
  // subtract the number % 7 and then add the result to the number
// Keep adding 7 until we get to the a number that no digit repeats (use until loop)
  // To check if no digit repeats:
    // convert to string, iterate through with every
      // if any of the digits is included an array of the digits (excluding the current digit)
        // return false, we can use indexOf and start from the current index (should equal -1 each iteration)

function featured(num) {
  const isUnique = (num) => [...num].every((val, idx) => num.indexOf(val, idx + 1) === -1);
  const maxFeaturedNum = 9876543201;
  if (num >= maxFeaturedNum) return `There is no featured number after the value ${num}.`;

  let featureNum = num + (7 - num % 7);
  if (featureNum % 2 === 0) featureNum += 7;

  while (!isUnique(String(featureNum))) featureNum += 14;
  return featureNum;
}

// Sum square - Square Sum

// Write a function that computed the diff between
  // the square of the sum of the first n pos ints and the sum of the squares of the first n pos ints
// sum squared subtract sum of squares

sumSquareDifference(3);     // 22  (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
sumSquareDifference(10);    // 2640
sumSquareDifference(1);     // 0
sumSquareDifference(2);     // 4
sumSquareDifference(100);   // 25164150

// calculate the sum using reduce
// Create a functoin that will sum up digits with an optional power passed to it
  // if power is omitted then 1 (1**1, etc)
// subtract the result of passing power of 1 to the power of 2 by the result of passing power of 2

function sumSquareDifference(n) {
  const sumUpTo = (num, exp = 1) => new Array(num).fill(0).reduce((sum, _, i) => {
    return sum + (i + 1)**exp;
  }, 0);

  return sumUpTo(n)**2 - sumUpTo(n, 2);
}

// Bubble Sort

// Works by making iterations through an array
  // On each pass the two values of each pair of consecutive elements are compared
  // If the first value is greater than the second, the two elements are swapped
  // This process repeats until a complete pass is made without performing any swaps
  // This means the array is sorted

// Write a function that takes an array as an arg and sorts that array using bubble sort
// The sorting should be done in place, the function should mutate the array
  // assume that the array contains at least two elements

var array = [5, 3];
bubbleSort(array);
console.log(array);    // [3, 5]

var array = [6, 2, 7, 1, 4];
bubbleSort(array);
console.log(array);    // [1, 2, 4, 6, 7]

var array = ['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie'];
bubbleSort(array);
console.log(array);    // ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

// At the start of each round of iterations, set a counter to 0
// Iterate through length of array - 1 times
  // check if element 1 is bigger than element 2, 
  //  if it is, use a temp variable to swap the values
    // tmp = arr[idx], arr[idx] = arr[idx + 1], arr[idx + 1] = tmp
    // increment the counter by 1
  //  if the counter is 0, return (means no swaps have taken place)

function bubbleSort(array) {
  let count = 0;

  while (true) {
    count = 0;
    array.forEach((val, idx) => {
      if (idx === array.length - 1) return;

      if (val > array[idx + 1]) {
        let tmp = val;
        array[idx] = array[idx + 1];
        array[idx + 1] = tmp;
        count += 1;
      }
    });

    if (count === 0) return;
  }
}


