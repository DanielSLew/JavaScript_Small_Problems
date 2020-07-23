// Randomizer

// Write a randomizer func that accepts n callbacks
// calls each callback at some random point between now and 2 * n seconds from now

function randomizer(...callbacks) {
  for (let i = 1; i <= callbacks.length * 2; i++) {
    setTimeout(() => console.log(i), 1000 * i);
  }

  [...callbacks].forEach(callback => {
    setTimeout(callback, Math.floor(Math.random() * callbacks.length * 2) * 1000);
  });
}

// Reverse Engineer

// W/o changing behaviour of the code, remove the call to event.stopPropagation

document.querySelector('html').addEventListener('click', function() {
  document.querySelector('#container').style = 'display: none';
});

document.querySelector('#container').addEventListener('click', function(event) {
  event.stopPropagation();
});

// When the html Element is clicked, we hide the container
// When the container is clicked, we stop the propagation (ie. stop it from being hidden)
// To prevent this behaviour we need get the HTML element to fire on the capturing phase
// And if we click the container we can set its style to null

document.querySelector('html').addEventListener('click', function() {
  document.querySelector('#container').style = 'display: none';
}, true);

document.querySelector('#container').addEventListener('click', function(event) {
  event.currentTarget.style = null;
});

// or

document.querySelector('html').addEventListener('click', function() {
  let container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});

// Bold Element + Custom
// Implement a function that makes an element bold and allows th euser of the function
// to optionally do something else w/ it

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(element);
  }
}

let event = new CustomEvent('bolded', {
  bubbles: true,
});

document.addEventListener('bolded', event => {
  event.target.style.fontWeight = 'bold';
});

function makeBold(element) {
  element.dispatchEvent(event);
}

// Buggy Code

// We need to preventDefault on the on the current element because the link tag is
// its container, so the behaviour bubbles down to the 'img' tag as well.
// If we add preventDefault() on the current event, it will prevent the link from moving

// Context Menus

// Add a context menu that will alert to an elements id or main

document.addEventListener('contextmenu', event => {
  event.preventDefault();
  event.stopPropagation();
  alert(event.target.id || "main");
});


// Selection Filters

// Write JS code that updates the options on one dropdown when the selection in
// the other dropdown changes
// ie, when user chooses an option under Classifications, items in Animals dropdown
// should change accordingly

// Create two objects that will hold the selection as keys and options as values array
// Add an event to each dropdown menu, that if a selection is made
// Filter the options on the other dropdown menu to hide the values that aren't present
// in the object's value for that key

let menus = {
  Classifications: {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
  },
  
  Animals: {
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
  },
};

let classifMenu = document.querySelector('#animal-classifications');
let animalsMenu = document.querySelector('#animals');
let form        = document.querySelector('#selection-filters');
let button      = document.querySelector('#clear');

form.addEventListener('input', event => {
  let trait    = event.target.value;
  let options  = event.target === classifMenu ? animalsMenu : classifMenu;
  let menuType = options[0].value;

  [...options.children].slice(1).forEach(option => {
    option.hidden = !menus[menuType][option.value].includes(trait);
  });
});

button.addEventListener('click', event => {
  event.preventDefault();
  form.reset();
  [...animalsMenu.children, ...classifMenu.children].forEach(option => {
    option.hidden = false;
  });
});

// Article Highlighter

// Take the given CSS/HTML
// When user clicks on a nav link (articles 1-4), the browser scrolls to that article
  // in the `<main>` element and adds the highlight class to it
// When a user clicks on an article element or any of its child elements
  // browser adds the highlight class to it
// When the user clicks anywhere else on the page, browser adds highclass class to
  // main element
// Only one element can be highlighted at any given time.

// Add an event listener on the parent (main) to listen for 'click'
// Remove highlight class from the variable
// add highlight to the event.target
// save the target to a variable

// Add an event listener to ul, when link is clicked, add activate the click
// event for the value of href.

let articles   = document.querySelector('main');
let nav        = document.querySelector('ul');
let clickEvent = new MouseEvent('click', { bubbles: true });
let previousHighlightedElem;

articles.addEventListener('click', event => {
  let article = event.target.parentNode;

  if (previousHighlightedElem && previousHighlightedElem !== article) {
    previousHighlightedElem.classList.remove('highlight');
  }
    
  article.classList.add('highlight');
  previousHighlightedElem = article;
});

nav.addEventListener('click', event => {
  document.querySelector(event.target.hash).firstChild.dispatchEvent(clickEvent);
});

// Delegate Event Function

// Implement a function named delegateEvent that delegates events to the descendant
  // elements of a parent element that match a given selector
// Function takes four args:
  // parentElement
  // selector
  // eventType
  // callback
// Returns true if it was able to add an event listener and undefined if not

// Eg. parentElement is section and selector is p, function should delegate
  // events of eventType on the p element within section to the function callback
  // then returns true

// If calling querySelector with the selector on the element passed in returns a DOM node

// Then add an event listener named eventType which initiates callback
// Only initiates callback if target === selector

// 'aside section p'
// split the selectors, pass in the array to function
// Iterate through aside 
var element1 = document.querySelector('table');
var element2 = document.querySelector('main h1');
var element3 = document.querySelector('main');

var callback = function(event) {
  alert('Target: ' + event.target.tagName + '\nCurrent Target: ' + event.currentTarget.tagName);
};

function delegateEvent(parentElement, selector, eventType, callback) {
  if (!parentElement) return;
  let delegatedEles = [];
  
  function getLiveColls(currEle, tags) {
    if (tags.length === 1) return delegatedEles.push(currEle.getElementsByTagName(tags[0]));
    
    currEle.querySelectorAll(tags[0]).forEach(elem => getLiveColls(elem, tags.slice(1)));
  }

  getLiveColls(parentElement, selector.split(' '));


  parentElement.addEventListener(eventType, event => {
    if (delegatedEles.flatMap(el => [...el]).includes(event.target)) callback(event);
  });

  return true;
}

// Events Tracker

// Implement a function that tracks events on a web page by wrapping a callback
// function in a function that adds each event to a tracker obj before invoking
// the callback
// Function will atke a callback func as an arg, and return a new func
  // records the event
  // executes the original callback function

let divRed = document.querySelector('#red');
let divBlue = document.querySelector('#blue');
let divOrange = document.querySelector('#orange');
let divGreen = document.querySelector('#green');

divRed.addEventListener('click', track(function(event) {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(function(event) {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(function(event) {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(function(event) {
  document.body.style.background = 'green';
}));

const tracker = (function() {
  let elements = [];

  return {
    elements: function() {
      return elements.slice();
    },

    clear: function() {
      elements = [];
      return 0;
    },

    list: function() {
      return elements.slice();
    },

    add: function(ele) {
      elements.push(ele)
    }
  };
})();


function track(callback) {
  return function() {
    if (event.target === event.currentTarget) {
      tracker.add(event.target);
      callback(event);
    }
  };
}


