// Ancestors

// Implement an ancestors method that returns the prototype chain
// of a calling object as an array of object names

// Use a while loop to iterate through
// Do this until the result equals Object.prototype
// Use Object.getPrototypeOf() to move up the ancestor chain

Object.prototype.ancestors = function () {
  var ancestors = [];
  var obj = this;

  while (true) {
    obj = Object.getPrototypeOf(obj);
    if (obj.name === undefined) return ancestors.concat('Object.prototype');
    ancestors.push(obj.name);
  }
}

// Delegate

// Write a delegate function that can be used to delegate the behaviour
// of a method or functoin to another object's method
// delegate takes a min of two args
// Args: object, name of method on object
// Remaining args are passed as args to the object's method that it delegates

// Need to use call on the prototype of the object
// Pass in the name of the property and the object (which will be this)

function delegate(context, methodName, ...args) {
  return function() {
    return context[methodName].call(context, ...args);
  };
}
