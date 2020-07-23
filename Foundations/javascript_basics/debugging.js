// Hello Friends!

// Fix the following code

function randomGreeting() {
  var words = ['Hello', 'Howdy', 'Hi', 'Hey there', 'What\'s up',
               'Greetings', 'Salutations', 'Good to see you'];

  var idx = Math.floor(Math.random() * words.length);

  words[idx];
}

function greet() {
  var names = Array.prototype.slice.call(arguments);
  var i;

  for (i = 0; i < names.length; i++) {
    var name = names[i];
    var greeting = randomGreeting;

    console.log(greeting + ', ' + name + '!');
  }
}

greet('Hannah', 'Jose', 'Beatrix', 'Julie', 'Ian');


// randomGreeting needs to be a function invocation so we need to add ()
// after to get thr right return
// We also need to explicitly have a return statement in randomGreeting.


function randomGreeting() {
  var words = ['Hello', 'Howdy', 'Hi', 'Hey there', 'What\'s up',
               'Greetings', 'Salutations', 'Good to see you'];

  var idx = Math.floor(Math.random() * words.length);

  return words[idx];
}

function greet() {
  var names = Array.prototype.slice.call(arguments);
  var i;

  for (i = 0; i < names.length; i++) {
    var name = names[i];
    var greeting = randomGreeting();

    console.log(greeting + ', ' + name + '!');
  }
}

greet('Hannah', 'Jose', 'Beatrix', 'Julie', 'Ian');


// Includes False

// This method searches a list of primitives for the boolean false, if found
// Function returns true, Fix the code so that it works:

function includesFalse(list) {
  var i;
  var element;

  for (i = 0; i < list.length; i++) {
    element = list[i];

    if (element == false) {
      return true;
    }
  }

  return false;
}
                                                                  // returns:
includesFalse([8, null, 'abc', true, 'launch', 11, false]);       // true
includesFalse(['programming', undefined, 37, 64, true, 'false']); // false
includesFalse([9422, 'lambda', true, 0, '54', null]);             // true

// We need to use strict equality `===`, otherwise it can coerce a value into false and
// cause our function to have unexpected results

// Place a Bet

// This function accepts a guess from the user from 1-25, determine a winning number
// Fix the code so an error is not raised

function placeABet(guess) {
  (function generateRandomInt() {
    return Math.floor(Math.random() * 25) + 1;
  });

  var winningNumber = generateRandomInt();

  if (guess < 1 || guess > 25) {
    return 'Invalid guess. Valid guesses are between 1 and 25.';
  }

  if (guess === winningNumber) {
    return "Congratulations, you win!";
  } else {
    return "Wrong-o! You lose.";
  }
}

var userGuess = parseInt(prompt('Input a guess between 1-25'), 10);
alert(placeABet(userGuess));

// A function expression is immediately invoker, so on the first line of the method
// generaterandomInt gets invoked and the number it returns is not saved anywhere
// On like 95 var winningNumber tries to call a function that does not exist so it will raise
// A reference error.
// To fix this we need to remove the parentheses from generateRandomInt.

// Pick Museum Filter

// This function takes into consideration museum preferences
// The boolean check is flawed, how can it be fixed?

function wantToVisit(museum, city) {
  return museum.includes('Computer')
      || museum.includes('Science')
      && !(museum.includes('Modern')
        && museum.includes('Art')
        && museum.includes('Andy Warhol')
        || city === 'Amsterdam');
}

// Tests (should all print 'true')

console.log(wantToVisit('Computer Games Museum', 'Berlin') === true);
console.log(wantToVisit('National Museum of Nature and Science', 'Tokyo') === true);
console.log(wantToVisit('Museum of Modern Art', 'New York') === false);
console.log(wantToVisit('El Paso Museum of Archaeology', 'El Paso') === false);
console.log(wantToVisit('NEMO Science Museum', 'Amsterdam') === true);
console.log(wantToVisit('National Museum of Modern Art', 'Paris') === false);
console.log(wantToVisit('Andy Warhol Museum of Modern Art', 'Medzilaborce') === true);
console.log(wantToVisit('Moco: Modern Contemporary Art', 'Amsterdam') === true);
console.log(wantToVisit('Van Gogh Museum', 'Amsterdam') === false);

// Our logic is backwards, we want to look for computer or science museums OR museums
// that are a specific kind of modern Art

function wantToVisit(museum, city) {
  return museum.includes('Computer')
      || museum.includes('Science')
      || (museum.includes('Modern')
        && museum.includes('Art')
        && (museum.includes('Andy Warhol')
        || city === 'Amsterdam'));
}

// Pomodoro

// The following code demonstrates the pomodoro technique, it never prints the minute count
// how do we fix this?

var tasks = 10;
var checkmarks = 0;
var sessions = 0;
var minutes = 0;

function pomodoro() {
  console.log('Work.');

  while (minutes < 25) {
    minutes += 1;
    console.log('...' + minutes);
  }

  console.log('PLING!');

  sessions += 1;
  checkmarks += 1;

  if (checkmarks === tasks) {
    console.log('Done!');
    return;
  }

  var rest;
  if (sessions === 4) {
    sessions = 0;
    rest = 30;
  } else {
    rest = 5;
  }

  console.log('Rest for ' + rest + ' minutes.');

  var minutes = 0;
  pomodoro();
}

pomodoro();

// This is because variables are function scoped, so in the pomodoro function
// the var minutes declaration is hoisted to the top of the function, but because there
// is no assignment minutes references undefined. so minutes < 25 evaluates to falsy and the 
// while loop does not run.
// On line 193 we need to remove the var declaration and just assign minutes to 0.

// Shop Transactions

// This code is meant to log a shops financial transactions, and make sure each
// transaction is valid. Can you fix the problem?

var transactionLog = [];

function processInput(input) {
  var numericalData = parseFloat(input);

  if (isNaN(numericalData)) {
    throw (new Error('Data could not be converted to numerical amount.'));
  }

  return numericalData;
}

function logTransaction() {
  var data = prompt('Please enter the transaction amount: ');

  try {
    data = processInput(data);
    transactionLog.push(data);

    alert('Thank you. Data accepted.');
  } catch {
    alert(error.message);
  }
}

function transactionTotal() {
  var total = 0;
  var i;

  for (i = 0; i < transactionLog.length; i++) {
    total += transactionLog[i];
  }

  return total;
}

logTransaction();
logTransaction();
logTransaction();

console.log(transactionTotal());

// Adding floating point numbers can be imprecise, so it's best to deal in cents
// When dealing with money. So to fix this problem, we can multiply parse float by 100
// and then call Math.floor on it.
// If we want a dollar amount returned we can just divide the total by 100 when returning.
// We also do not define error when we catch it, so on line 230 we need to add
// catch (error) so that the next line when we alert the error message it works.
// We also don't even need a try/catch statement, because this situation is easy to handle
// NaN is a falsy value so we can just check if (data) run our happy path, else alert an error message.

// Full Moon

// Change the code so every warning is just displayed once instead of twice by accident

var species = ['wolf', 'human', 'wasp', 'squirrel', 'weasel', 'dinosaur'];
var isMidnight = true;
var isFullmoon = true;

function isTransformable(species) {
  return species[0] === 'w';
}

function transform(species) {
  return 'were' + species;
}

var i;
for (i = 0; i < species.length; i++) {
  var thisSpecies = species[i];
  var newSpecies;

  if (isMidnight && isFullmoon && isTransformable(thisSpecies)) {
      newSpecies = transform(thisSpecies);
  }

  if (newSpecies) {
    console.log('Beware of the ' + newSpecies + '!');
  }
}

// In this loop we only assign newSpecies to a new value if it meets the conditinos
// So when we reach a path that shouldn't meet the condition, newSpecies still references
// The old value, so we log the warning again. In this case we have a value that meets
// The condition every other value in the species array, so this is why it's logged twice
// We need to move the warning message into the same if condition as the if condition
// That checks if we should call the transform function.

// Space Design

// Why does displaying the CEO and scrum master shows undefined

// Roles (salary still to be determined)

var ceo = {
  tasks: ['company strategy', 'resource allocation', 'performance monitoring'],
  salary: 0,
};

var developer = {
  tasks: ['turn product vision into code'],
  salary: 0,
};

var scrumMaster = {
  tasks: ['organize scrum process', 'manage scrum teams'],
  salary: 0,
};

// Team -- we're hiring!

var team = {};

team[ceo] = 'Kim';
team[scrumMaster] = 'Alice';
team[developer] = undefined;

var company = {
  name: 'Space Design',
  team: team,
  projectedRevenue: 500000,
};

console.log('----{ ' + company.name + ' }----');
console.log('CEO: ' + company.team[ceo]);
console.log('Scrum master: ' + company.team[scrumMaster]);
console.log('Projected revenue: $' + company.projectedRevenue);

// ----{ Space Design }----
// CEO: undefined
// Scrum master: undefined
// Projected revenue: $500000

// The expression team[ceo] references the variable ceo which returns an object,
// Which is the coerced into a string (all object keys are strings) which makes
// The key '[object Object]'. and so when we add scrumMaster and developer they all
// Reference the same key, and because developer is the last one we add which references the value
// undefined. We essentially call the same the same key-pair in all three cases
// with company.team['[object Object]'].



// Expensive Study Preparation

// Why are we being charged incorrectly in the following code?

// The shopping cart is a list of items, where each item
// is an object { name: <string>, amount: <number> }.
var shoppingCart = [];

// Currently available products with prices.
var prices = {
  'notebook': 9.99,
  'pencil': 1.70,
  'coffee': 3.00,
  'smoothie': 2.10,
};

function price(item) {
  return prices[item.name];
}

// Adding an item to the shopping cart.
// The amount is optional and defaults to 1.
// If the item is already in the cart, its amount is updated.
function updateCart(name, amount = 1) {
  amount = amount || 1;

  var i;
  var item;
  var alreadyInCart = false;

  for (i = 0; i < shoppingCart.length; i += 1) {
    item = shoppingCart[i];

    if (item.name === name) {
      item.amount = amount;
      alreadyInCart = true;
      break;
    }
  }

  if (!alreadyInCart) {
    shoppingCart.push({ name: name, amount: amount });
  }
}

// Calculating the price for the whole shopping cart.
function total() {
  var total = 0;
  var i;

  for (i = 0; i < shoppingCart.length; i += 1) {
    var item = shoppingCart[i];

    total += (item.amount * price(item));
  }

  return total.toFixed(2);
}

function pay() {
  // omitted

  console.log('You have been charged $' + total() + '.');
}

function checkout() {
  pay();
  shoppingCart = {};
}

// Example purchase.

updateCart('notebook');
updateCart('pencil', 2);
updateCart('coffee', 1);
// "Oh, wait, I do have pencils..."
updateCart('pencil', 0);

checkout();
// You have been charged $14.69.

// Using amount = amount || 1 as a method to set a default value means that
// If we pass in a falsy value (0) it will register it the same as no value passed
// in, so if we explicitly set amount to 0, it will default to 1.
// A method to fix this problem is to always set default values in the parameters for
// the function itself, this way the code is more clear and concise.
function updateCart(name, amount = 1)
// and then we can remove the first line of the function.


// Stuck on Page 18

// The follow code is a simplified model of how we read a software dev book,
// this code results in a stack overflow, what is wrong?

var totalPages = 364;
var energy = 100;

function read() {
  var currentPage = 1;

  while (energy > 0 && currentPage < totalPages) {
    currentPage += 1;
    energy -= (5 + currentPage * 0.1);
  }

  console.log('Made it to page ' + String(currentPage) + '.');

  // Drink a cup of coffee.
  energy = 100;

  // Continue reading.
  if (currentPage < totalPages) {
    read();
  } else {
    console.log('Done!');
  }
}

read();

// In this case we declare a new currentPage variable in each call to read()
// Because of this we will never reach a case where current is greater than totalPages
// so our method will continue it's recursive calls with no end.

require 'pry'

def longest(s)
  tmp = "" 
  result = s.chars.map do |ch|
    binding.pry
    if tmp.empty? || ch >= tmp[-1]
      tmp << ch
    else
      tmp = ch
    end
  end
  p result
  result.max_by(&:size)
end


