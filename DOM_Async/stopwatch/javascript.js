// Four two digit counters
// Use leading zeros when needed
// hours/minutes/seconds/centiseconds
// centisecond is 10 msec

// Start/Stop button
  // Create a new interval that will update the time every
  // 10 msec
// Reset button

// When user clicks Start
  // button changes to stop
// And vice versa

// Reset button also toggles the stop counter

// add a click event to start
// when clicked, toggle both start and stop button
// create a set interval

const Timer = function() {
  let $reset  = $('#reset');
  let $timer  = $('#timer');
  let maxTimes = {
    centiseconds: 99,
    seconds: 59,
    minutes: 59,
    hours: 99,
  };

  function startTimer() {
    return setInterval(() => incrementOne($('#centiseconds')), 10);
  }

  function incrementOne(time) {
    let currentTime = parseInt(time.text(), 10);

    if (currentTime + 1 > maxTimes[time.attr('id')]) {
      time.text('00');
      incrementOne(time.prev());
    } else {
      time.text(String(currentTime + 1).padStart(2, '0'));
    }
  }

  function toggleTimer(e) {
    let type = $(e.target).attr('id');   
    $('#start, #stop').toggle()
    
    if (type === 'start') {
      this.clock = startTimer()
    } else {
      clearInterval(this.clock);
      this.clock = null;
    }
  }

  function resetTime() {
    $timer.children().each((i, t) => $(t).text('00'));
    if (this.clock) $('#stop').trigger('click'); 
  }

  return {
    bindEvents: function() {
      $('.controls').on('click', 'button', toggleTimer.bind(this));
      $('#reset').on('click', resetTime.bind(this));
    },

    init: function() {
      this.bindEvents();
    },
  };
}();

Timer.init();


