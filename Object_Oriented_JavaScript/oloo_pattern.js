// Anonymizer

// Use OLOO create an Account prototype object that anonymizes user
// objects on init
// Created object should not have access to the function that
  // anonymizes a user other than through the init and reanonymize methods
// Function creates a 16 char sequence composed of letters and numbers
// The following are the properties and methods on the Account obj

// init:
  // sets the email, password, firstName, lastName, and displayName
    // displayName is a 16 char sequence generated for the user
// reanonymize:
  // generates a new 16 char sequence and assigns to displayName
  // if the pw provided is valid
  // Return true if successful, 'Invalid Password' if invalid
// resetPassword
  // Asks for a new password and reassigns to password prop
  // User must provide the current password
  // Returns 'Invalid Password' if notvalid, and true if valid
// firstName:
  // Returns the first name of the user if the pw is valid
// lastName:
  // same as above
// email:
  // same as above
// displayName:
  // returns the displayName (16 seq chars)

// Other than the above props, methods, and inherited props from
// Object.prototype, no other method should eeixst on Account proto

// Create an object Account, that will hold the above props


var Account = (function() {
  function generateRandomSequence() {
    var sequence = '';
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (i = 0; i < 16; i += 1) {
      sequence += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return sequence;
  }

  function getProperty(property) {
    return function(password) {
      if (this.password !== password) return 'Invalid Password';

      return this[property];
    }.bind(this);
  }

  function setProperty(property, user) {    
    return function(password, newPropertyValue) {
      if (this.password !== password) return 'Invalid Password';
      user = user || this;

      if (property === 'displayName') newPropertyValue = generateRandomSequence();

      return !!(user[property] = newPropertyValue);
    }.bind(this);
  }

  return {
    init: function(email, password, firstName, lastName) {
      var user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };

      this.displayName = generateRandomSequence();
      this.email       = getProperty.call(user, 'email');
      this.firstName   = getProperty.call(user, 'firstName');
      this.lastName    = getProperty.call(user, 'lastName');

      this.reanonymize   = setProperty.call(user, 'displayName', this);
      this.resetPassword = setProperty.call(user, 'password');

      return this;
    },
  };
})();

