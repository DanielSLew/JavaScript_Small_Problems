// Make an extend function and use it to add a mixin to the previous
// exercise

// mixins adds an invoice and a payTax method

function delegate(callingObject, methodOwner, methodName) {
  return function() {
    return methodOwner[methodName].apply(callingObject, arguments);
  };
}

function extend(context, mixin) {
  Object.keys(mixin).forEach(function(name) {
    context[name] = delegate(context, mixin, name);
  });

  return context
}

var professional = { 
  payTax: function() {
    console.log(`${this.fullName()} is Paying taxes`);
  },

  invoice: function() {
    console.log(`${this.fullName()} is billing customers`);
  },
}
