// Grab the position().top from form the input element
// Grab the width() from the element

// input event:
  // change the css on the error message to
  // top: position().top, left: position().left + element.innerWidth()
  // Toggle error_message

// 'focus' event:
  // toggle error_message

// Create an object w/ the error messages
  // This will correspond to the input names
  // errorMessages[$(this).attr('name')]

const errorMessages = {
  first_name: 'First name is required',
  last_name: 'Last name is required',
  email: 'Must be a valid email address',
  phone_number: 'Must be a valid 10 digit phone number',
  password: 'Password must be at least 10 characters',
  credit_card: 'Input a valid 16 digit credit card number',
};

const $creditCard =  $('input[name="credit_card"]')
const $error = $('#error_message');
const $submission = $('#submission');
const $form = $('form');

$form.on('submit', function(e) {
  e.preventDefault();

  $('input').each((idx, input) => {
    if (!input.checkValidity()) $(input).addClass('error');
  });

  if ($('input').filter('.error').length > 0) {
    $('#form_error').toggle();
  } else {
    let data = $form.serialize();

    data = data.replace(/((credit_card=)\d+&)+/, function(match, _, c) {
      let number = match.match(/\d+/g).join('');
      return `${c}${number}&`
    });

    $submission.find('p').text(data);
    $form[0].reset();
  }
});

$form.on('blur', 'input', function(e) {
  let $input = $(this);

  if (!this.checkValidity()) {
    $error.text(errorMessages[$input.attr('name')]);
    $error.css({
      top: $input.position().top + 'px',
      left: ($input.position().left + $input.innerWidth()) + 'px',
    }).fadeIn(400);
    $input.addClass('error');
  }
});

$form.on('focus', 'input', function(e) {
  $error.toggle(false);
  $(this).removeClass('error');
});

$('input[name$="name"]').on('keypress', function(e) {
  if (!e.key.match(/[a-z\-]/i)) e.preventDefault();
});

$creditCard.on('keypress', function(e) {
  if (!e.key.match(/\d/)) e.preventDefault();
});

$creditCard.on('keyup', function(e) {
  e.preventDefault();
  if (e.shiftKey && e.key === 'Tab') $(this).prev().trigger('focus');
  if ($(this).val().length === 4) $(this).next().trigger('focus');
});


