// What is this
// What do you think is logged on line 7?

var person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// This will log NaN beause anywhere outside a function, `this`
// is bound to the global object, if the keyword is used inside a function
// the value depends on how the function was invoked
// so window.firstName was not delcared.

// The Franchise
// Why is this method:
var franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    });
  },
};
// Not returning:
[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

// Fix and explain the problem

// The issues lies with the layed function scopes, `self` only holds
// the reference to the object one layer deep
// So when we define the callback, there is no reference to `this`,
// So `this` will resolve to the global object, to fix this we can specify
// explicitly a context for the function

var franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }, this);
  },
};

// The Franchise - Solution 2
// Solve the previous problem by using a hard-bound anonymous function

var franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

// Our very own bind()
// Create a function myBind that accepts two args, the function to bind
// and the context object
// it will return a new function that's hard bound to the passed in context obj

function myBind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

// myBind() Improved
// bind also implements another function besides hard binding functions to context objs
// It's called partial function application

// Alter myBind function to support partial function application

function myBind(func, context, ...args) {
  return function() {
    return func.call(context, ...args, ...arguments);
  };
}

// myFilter()
// Update the implementation of myFilter by adding the functionality
// of acception an optional thisArg

function myFilter(array, func) {
  var result = [];

  array.forEach(function(value) {
    if (func(value)) {
      result.push(value);
    }
  });

  return result;
}

var filter = {
  allowedValues: [5, 6, 9],
}

myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]

// We need to add a third parameter thisArg, 
// Then we can turn the array.forEach call into an IIFE
// and invoke it with calling it and attaching the context of thisArg

function myFilter(array, func, thisArg) {
  var result = [];

  array.forEach(function(value) {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}

// Garbage Collection
// Read the code carefully
// Will JS GC mechanism GB the variable count after function counter
// is run on line 10?

function makeCounter() {
  var count = 1;

  return function() {
    console.log(count++)
  };
}

var counter = makeCounter();
counter();

// JS will GC the value of 1 that count holds
// As count now references the Number value 2 instead

// Make a Stack
// Create a function newStack that when called returns a stack object
// w/ three methods, push pop and printStack
// push takes a value and inserts it at the end of the stack
// pop removes the last ele from the stack
// printStack logs each remaining element of the stack on its own line

// Internally use an array to implement the stack (make sure stack is private)

function newStack() {
  var stack = [];

  return {
    push: function(val) {
      return stack.push(val);
    },

    pop: function() {
      return stack.pop();
    },

    printStack: function() {
      stack.forEach(function(token) {
        console.log(token);
      });
    },
  };
}

// Don't Pullute my Window

// Consider the following code:

var name = 'Naveed';
var greeting = 'Hello';

var greeter = {
  message: greeting + ' ' + name + '!',
  sayGreetings: function() {
    console.log(this.message);
  },
};

// message property uses the result of concatentation as its value
// as a result we have two global variables name and greeting that pollute
// the global scope
// We can avoid using the global variables by simply setting the message
// property to the value 'Hello Naveed!'
// Let's pretend that we must use variables and concatentation to accomplish this
// Can we think of another way to refactor this code so we don't have any other
// variables in the global scope beisdes greeter?

var greeter = {
  message: (function() {
    var name = 'Naveed';
    var greeting = 'Hello';
    return greeting + ' ' + name + '!';
  })(),
  sayGreetings: function() {
    console.log(this.message);
  },
};

// School Improved
// Earlier we create a school object
// make the list students private
// Make the constaint for allowe values for years private variable
  // As a private variable it avoid unnecessary statement in the addStudent method
  // and makes the code more declarative
// Make the getCourse function accessible in the addGrade method also
  // as it is, only the courseReport method has access

var school = (function() {
  var students = [];
  var allowedYears = ['1st', '2nd', '3rd', '4th', '5th'];

  function getCourse(student, courseName) {
    return student.listCourses().filter(function(course) {
      return course.name === courseName;
    })[0];
  }

  return {
    addStudent: function(name, year) {
      if (allowedYears.indexOf(year) >= 0) {
        var student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent: function(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode})
    },

    addGrade: function(student, courseName, grade) {
      var course = getCourse(student, courseName);

      if (course) {
        course.grade = grade;
      }
    },

    getReportCard: function(student) {
      student.listCourses().forEach(function(course) {
        if (course.grade) {
          console.log(course.name + ': ' + String(course.grade));
        } else {
          console.log(course.name + ': In progress');
        }
      });
    },

    courseReport: function(courseName) {
      var courseStudents = students.map(function(student) {
        var course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(function(student) {
        return student.grade;
      });

      if (courseStudents.length > 0) {
        console.log('=' + courseName + ' Grades=');

        var average = courseStudents.reduce(function(total, student) {
          console.log(student.name + ': ' + String(student.grade));
          return total + student.grade;
        }, 0) / courseStudents.length;

        console.log('---');
        console.log('Course Average: ' + String(average));
      }
    },
  }
})();

