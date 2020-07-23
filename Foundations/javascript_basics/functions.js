// Exercise 1

// What will this code log to the console?

var myVar = 'This is global';

function someFunction() {
  var myVar = 'This is local';
}

someFunction();
console.log(myVar);

// This code will log "This is global" to the console


// Exercise 2

// What will this log to the console?

var myVar = 'This is global';

function someFunction() {
  var myVar = 'This is local';
  console.log(myVar);
}

someFunction();

// This will log "This is local" because console.log(myVar) is called from within
// the new scope, so myVar is shadowing the globally scoped myVar.


// Exercise 3

// What will this log to the console?

var myVar = 'This is global';

function someFunction() {
  myVar = 'This is local';
}

someFunction();
console.log(myVar);

// This will log "This is local" because someFunction has access to the myVar variable
// So it reassigns the variable to the new string, and the function is called before 
// the expression console.log(myVar);


// Exercise 4

// What will this log to the console?

var myVar = 'This is global';

function someFunction() {
  console.log(myVar);
}

someFunction();

// Same as last question, someFunction has access to the myVar global variable
// so when the function is called it will log "This is global"


// Exercise 5

// What will this log to the console?

function someFunction() {
  myVar = 'This is global';
}

someFunction();
console.log(myVar);

// When we don't declare a variable, it automatically sets it as global, which
// can lead to expected bugs in the program, this will log "This is global"


// Exercise 6

// What will this log to the console?

var a = 7;

function myValue(b) {
  b += 10;
}

myValue(a);
console.log(a);

// This will log 7 because when we pass variable a as an argument to myValue, myValue
// creates a new variable b that references the value held by a, which is then reassigned to 17
// inside the function.


// Exercise 7

// What will this log to the console?

var a = 7;

function myValue(a) {
  a += 10;
}

myValue(a);
console.log(a);

// This is the exact same situation as the question before, the variable a inside myValue
// is actually a brand new variable that is shadowing the global variable a
// So it will log 7.


// Exercise 8

var a = [1, 2, 3];

function myValue(b) {
  b[2] += 7;
}

myValue(a);
console.log(a);

// Because array are mutable, when we pass variable a to myValue, we don't create a new
//  variable, the b inside myValue is a reference to the original a object we are able to
// Reassign the contents of the variable, but we are not able to reassign the variable itself
// it will log 1, 2, 10.


// Exercise 9

console.log(a);

var a = 1;

// This will log undefined, because the variable declaration for a gets hoisted but
// the assignment of a to the value 1 is not hoisted. So at the time of the expression
// console.log(a); variable a is set to 'undefined'

// Exercise 10

logValue();

function logValue() {
  console.log('Hello, world!');
}

// functions (including their body) get hoisted, so the expression logValue(); is able
// to run without a hitch. We see 'Hello, world!' get logged.

// Further exploration

var logValue = 'foo';

function logValue() {
  console.log('Hello, world!');
}

console.log(typeof logValue);

// In this case, because both the function and the variable declaration get hoisted
// It becomes redundant, so we see the function declaration and then we reassign 
// logValue to the string 'foo', so when we log the typeof logValue it will log string.
