let $buttons     = $('#buttons');
let $entry       = $('#entry');
let $operations  = $('#operation');
let buttonValues = [
  '+', '-', '/', '*', '7', '8', '9', '%', '4', '5', 
  '6', 'NEG', '1', '2', '3', 'C', '0', '.', '=', 'CE',
];

let template = Handlebars.compile($('#calc').html());
$buttons.html(template({ buttons: buttonValues }));

const Calculator = {
  '+': function(a, b) { return a + b },
  '-': function(a, b) { return a - b },
  '/': function(a, b) { return a / b },
  '*': function(a, b) { return a * b },
  '%': function(a, b) { return a % b },
  '=': function(a, b) { return this[this.operation](a, b) },

  appendDigit: function(entry) {
    if ($entry.text().match('.') && entry === '.') return;
    let replaceDigits = this.placeholder; 
    
    $entry.text((i, nums) => replaceDigits ? entry : nums + entry);

    this.placeholder = false;
  },

  handleOperation: function(operation) {
    let entryValue = $entry.text();
    $operations.append(`${entryValue} ${operation} `);

    if (this.operation) {
      entryValue = this[this.operation](parseFloat(this.num), parseFloat(entryValue));
    }

    this.placeholder = true;
    this.num         = entryValue;
    this.operation   = operation;
    $entry.text(this.num);

    if (operation === '=') this.resetOperations();
  },

  resetEntry: function() {
    this.placeholder = true;
    $entry.text('0');
  },

  resetOperations: function() {
    this.operation = null;
    this.num       = null;
    $operations.text('');
  },

  toggleNegative: function() {
    let digits = $entry.text();
    $entry.text(digits.startsWith('-') ? digits.slice(1) : '-' + digits);
  },

  handleButtonClick: function(e) {
    let entry = $(e.target).val();

    if (entry.match(/[0-9.]/)) {
      this.appendDigit(entry);
    } else if (entry.match(/[+\-/*%=]/)) {
      this.handleOperation(entry);
    } else {
      switch (entry) {
        case 'CE':  this.resetOperations();
        case 'C':   this.resetEntry(); break;
        case 'NEG': this.toggleNegative(); break;
      }
    }
  },

  init: function() {
    this.resetEntry();
    $buttons.on('click', 'button', this.handleButtonClick.bind(this));
  },
}

Calculator.init();
