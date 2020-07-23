// Return:
// { 
//   'staff 1': 3,
//   'staff 2': 2,
//   'staff 3': 4,
// }

// Need to make a call to the API 
// GET  schedules
// Parse the data and add up (using reduce) each schedule for a staff member

function countSchedules(schedules) {
  return schedules.reduce((counts, schedule) => {
    id = 'staff ' + String(schedule.staff_id);  
    return { ...counts, [id]: (counts[id] || 0) + 1 };
  }, {});
}

function getSchedulesCountPerStaffMember() {
  let request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let counts = countSchedules(request.response);
    
    if (Object.keys(counts).length > 0) {
      alert('Here is a list of schedule count by staff member');
      alert(Object.entries(counts).map(count => {
        return `${count[0]}: ${count[1]}`;
      }).join("\n"));
    } else {
      alert('There are no currently no schedules available');
    }
  });

  request.addEventListener('timeout', event => {
    alert('The request you made has timed out, please try again.');
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed');
  });

  request.send();
}

// handle the event for submitting a form
// listen for submit event on the form
// If there is !email || !name 
  // alert(tell them to check their inputs
// If there is both valid inputs then alert that the staff member was added
// once the event fires, make an XHR to the server to
// add an entry into api/staff_members
// Make a query to the db

document.addEventListener('DOMContentLoaded', event => {
  let form  = document.querySelector('form');
  let email = document.querySelector('[name="email"]');
  let name  = document.querySelector('[name="name"]');

  form.addEventListener('submit', event => {
    event.preventDefault();

    let data = JSON.stringify({ email: email.value, name: name.value });
    let request = new XMLHttpRequest();

    request.open('POST', form.action);
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', event => {
      if (request.status === 400) {
        alert(request.response);
      } else if (request.status === 201) {
        alert(`Successfully created staff with id: ${JSON.parse(request.response).id}`);
        form.reset();
      }
    });

    request.send(data);
  });

  form.addEventListener('change', event => {
    let input = event.target;

    function toggleValidInputClass(validityCheck) {
      if (validityCheck) {
        input.classList.add('valid-input');
      } else {
        input.classList.remove('valid-input');
      }
    }

    if (input.name === 'email') {
      toggleValidInputClass(input.value.match(/\w+@\w+\.\w+/));
    } else if (input.name === 'name') {
      toggleValidInputClass(input.value);
    }
  });
});

// When the domcontentloaded event fires we need to:
  // We need to make an XHR to obstain staff list names
  // We will populate the select options w/ those names
  // Iterate through each of the staff array
    // Create new option element
    // new option.value = staff.name
    // append new option to the last child (appendChild)
  // add an event listener to the form element
  // listen to submit event
  // when target id is schedules
  // then deep clone the fieldset node
  // Add the new node using lastschedule.insertAdjacentElement('afterend', new schedule)

document.addEventListener('DOMContentLoaded', () => {
  let xhr  = new XMLHttpRequest();
  let form = document.querySelector('form');
  let submitButton = document.querySelector('#submit');
  let newScheduleButton = document.querySelector('#new-schedule');

  xhr.responseType = 'json';
  xhr.open('GET', 'http://localhost:3000/api/staff_members');

  xhr.addEventListener('load', event => {
    let select    = document.querySelector('select');
    let staffList = xhr.response;


    staffList.forEach(staff => {
      let option         = document.createElement('option');
      option.value       = staff.staff_id;
      option.textContent = staff.name;

      select.appendChild(option);
    });
  });

  xhr.send();

  submitButton.addEventListener('submit', event => {
    event.preventDefault();
    let data = new FormData(form);

    function validInputs() {
      let dates = form.querySelectorAll('[name="date"]');
      let times = form.querySelectorAll('[name="time"]');
      let schedulesToBeAdded = [...dates, ...times];

      return schedulesToBeAdded.every(entry => entry.value);     
    }

    let submitSchedules = new XMLHttpRequest();
    submitSchedules.setRequestHeader('Content-Type', 'application/json');
    submitSchedules.open('POST', form.action);
  });

  newScheduleButton.addEventListener('submit', event => {
    event.preventDefault();
    let newSchedule = form.querySelector('fieldset').cloneNode(true);
    submit.insertAdjacentElement('beforebegin', newSchedule);
  });

  // form.addEventListener('submit', event => {
  //   event.preventDefault();
  //   let data = new FormData(form);

  //   function validInputs() {
  //     let dates = form.querySelectorAll('[name="date"]');
  //     let times = form.querySelectorAll('[name="time"]');
  //     let schedulesToBeAdded = [...dates, ...times];

  //     return schedulesToBeAdded.every(entry => entry.value);     
  //   }

  //   if (event.target === submit) {
  //     if (validInputs()) {
  //       let submitSchedules = new XMLHttpRequest();
  //       submitSchedules.setRequestHeader('Content-Type', 'application/json');
  //       submitSchedules.open('POST', form.action);
  //     }
  //   } else {
  //     let newSchedule = form.querySelector('fieldset').cloneNode(true);
  //     submit.insertAdjacentElement('beforebegin', newSchedule);
  //   }
  // });

});

// create a function for cancelled schedules
// Args: scheduleId

// This function will create an XHR object
// open it to DELETE, api/schedules/${id}
// send it
// On load, if status code is 204, successfully delete else
// it will alert the response

function cancelSchedule(scheduleId) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://localhost:3000/api/schedules/' + scheduleId);
  xhr.send();

  xhr.onload = () => {
    alert (xhr.status === 204 ? 'Schedule deleted' : xhr.response);
  }
}

// Create a function to cancel bookings
// args  bookingId

// create an XHR object
// open it to PUT, api/bookings/booking_id
// send it
// on load, if status code is 204, successfully deleted, else alert response

function cancelBooking(bookingId) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', 'http://localhost:3000/api/bookings/' + bookingId);
  xhr.send();

  xhr.onload = () => {
    alert (xhr.status === 204 ? 'Successfully cancelled' : xhr.response);
  }
}

function createCancelEvent(type, method) {
  return function(id) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, `http://localhost:3000/api/${type}/${id}`);
    xhr.send();
    xhr.onload = () => alert (xhr.status === 204 ? 'Successfully cancelled' : xhr.response);
  }
}

const cancelBooking = createCancelEvent('bookings', 'PUT',);
const cancelSchedule = createCancelEvent('schedules', 'DELETE');

