//  Defaults

// What is the limitation to both these implementations for processOrder
// How does it affect the result?

function processOrder(price, quantity, discount, serviceCharge, tax) {
  if (!quantity) {
    quantity = 1;
  }

  if (!discount) {
    discount = 0;
  }

  if (!serviceCharge) {
    serviceCharge = 0.1;
  }

  if (!tax) {
    tax = 0.15;
  }

  return (price * quantity) * (1 - discount) * (1 + serviceCharge) * (1 + tax);
}

processOrder(100);      // 126.5

function processOrder(price, quantity, discount, serviceCharge, tax) {
  quantity = quantity || 1;
  discount = discount || 0;
  serviceCharge = serviceCharge || 0.1;
  tax = tax || 0.15;

  return (price * quantity) * (1 - discount) * (1 + serviceCharge) * (1 + tax);
}

// 0 is a falsy value, therefore if we explicitly put any of the arguments as 0,
// Then the function will think of it as the same as not including a value at all
// And set it to the default value.

// Equal

// This code does not log the expected result, explain whats happening and fix the code

var person = { name: 'Victor' };
var otherPerson = { name: 'Victor' };

console.log(person === otherPerson);    // false -- expected: true

// When comparing two objects, they only return true if both the objects are the same
// object, not if both the objects hold the same values
// We need to compare the value of their name property
console.log(person.name === otherPerson.name);

// Amount Payable

// What does the following code log, and why?

var startingBalance = 1;
var chicken = 5;
var chickenQuantity = 7;

var totalPayable = function (item, quantity) {
  return startingBalance + (item * quantity);
};

startingBalance = 5;
console.log(totalPayable(chicken, chickenQuantity));

startingBalance = 10;
console.log(totalPayable(chicken, chickenQuantity));

// This will log 40, 45
// Because totalPayable is a variable holding the function, so we can pass
// arguments to the variable and it will pass it to the function expression
// that the variable holds.

// Caller

// The doubler function takes two args a number to double and return, and a string
// containing the name of the function's caller

function doubler(number, caller) {
  console.log('This function was called by ' + caller + '.');
  return number + number;
}

doubler(5, 'Victor');                   // returns 10
// logs:
// This function was called by Victor.

// Write a makeDoubler function that takes a caller name as an arg and returns a function
// that has the same behaviour as doubler, but with a preset caller


function makeDoubler(caller) {
  return function doubler(number) {
    console.log('This function was called by ' + caller + '.');
    return number + number;
  }
}

var doubler = makeDoubler('Daniel');
doubler(5)  // 10, logs ....called by Daniel.

// What's my Value?
// What will the following program log to the console and why?

var array = ['Apples', 'Peaches', 'Grapes'];

array[3.4] = 'Oranges';
console.log(array.length);
console.log(Object.keys(array).length);

array[-2] = 'Watermelon';
console.log(array.length);
console.log(Object.keys(array).length);

// invalid indexes are set as properties of the array, which are not taken into
// consideration when we call length. But it is taken into consideration when we
// Use Object.keys because this returns an array of all of the properties (including elements)
// Logs: 3, 4 // 3, 5

// Length

// What values will be logged to the console and why?

var languages = ['JavaScript', 'Ruby', 'Python'];
console.log(languages);
console.log(languages.length);

languages.length = 4;
console.log(languages);
console.log(languages.length);

languages.length = 1;
console.log(languages);
console.log(languages.length);

languages.length = 3;
console.log(languages);
console.log(languages.length);

languages.length = 1;
languages[2] = 'Python';
console.log(languages);
console.log(languages[1]);
console.log(languages.length);

// ['JavaScript', 'Ruby', 'Python']
// 3

// Empty elements are not logged, but they are taken into consideration for length
// ['JavaScript', 'Ruby', 'Python' <1 empty item> ]
// 4

// Elements are removed to fit the length
// ['JavaScript']
// 1

// Elements that were removed don't come back, they were permanently lost
// ['JavaScript', <2 empty items> ]
// 3

// Using bracket notation sets the index of that element and fill in the spaces
// Between with empty
// ['JavaScript', <1 empty space>, 'Python']
// empty spaces return undefined
// 3 beause length is one more than the highest indexed element.

// The Red Pill

// Read through the code and determine what will be logged

function one() {
  function log(result) {
    console.log(result);
  }

  function anotherOne() {
    var result = '';
    var i;
    for (i = 0; i < arguments.length; i += 1) {
      result += String.fromCharCode(arguments[i]);
    }

    log(result);
  }

  function anotherAnotherOne() {
    console.log(String.fromCharCode(87, 101, 108, 99, 111, 109, 101));
    anotherOne(116, 111);
  }

  anotherAnotherOne();
  anotherOne(116, 104, 101);
  return anotherOne;
}

one()(77, 97, 116, 114, 105, 120, 33);

// The first function called inside one is anotherAnotherOne which will log
// logs: 'Welcome'
// anotherOne is invoked inside anotherAnotherOne which will log
// logs: 'to'
// Then anotherOne is invoked with 3 args
// logs: 'the'
// Then the one function returns anotherOne which is immediately passed
  // 7 arguments to invoke the function. anotherOne has access to the log function
  // because it was declared in its enclosing scope inside the one function
// logs: 'Matrix!'

