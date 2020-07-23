// Buggy Cody 1
// The following throws an error:

function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      var msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += morning + ' ' + name;
          break;
        case 'afternoon':
          msg += afternoon + ' ' + name;
          break;
        case 'evening':
          msg += evening + ' ' + name;
          break;
      }

      console.log(msg);
    },
  };
}

// This code throws an error because in the implementation of the greet
// method we need to append the property that we're referencing with
// this, as in this.morning, this.afternoon, this.evening

// Further exploration:
// The reason we can reference name directly is beacuse name is a local variable
// Scoped at the top level of the function, so it is available to use throughout
// each scope we created, unless the variable is name shadowed.

// Buggy Code 2
// Why are we getting unexpected results from this discount calculator

var item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    var discount = this.price * percent / 100;
    this.price -= discount;
    
    return this.price;
  },
};

> item.discount(20)   // should return 40
= 40
> item.discount(50)   // should return 25
= 20
> item.discount(25)   // should return 37.5
= 15

// The reason for this bug, is because we are changing the value of price
// Each time the method is invoked. Because of this change, the actual
// price of the item keeps reducing by the discounted amount.

// Testing Object Equality
// Write a function objectsEqual that accepts two obj args
// Returns true or false depending on whether the objects have the same
// Key value pairs

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

// We need to grab one of the objects keys and value using Object.entries
// After we have the set of values we need to iterate using every
// Which will return true if every entry is accounted for
// We also need to add a guard clause that checks if the two objects
// have the same amount of keys (return false if they don't)
// each iteration will check obj2[key] === value


function objectsEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  let objKeys = Object.keys(obj2);

  return Object.entries(obj1).every(([key, value]) => {
    let idx = objKeys.indexOf(key);
    if (idx !== -1) objKeys.splice(idx, 1);
    return obj2[key] === value;
  }) && objKeys.length === 0;
}

// Student
// Create an object factory for a student object
// info: logs the name and year of student
// addCourse: enrolls student in a course, a course is an obj literal w/ name and code properties
// listCourses: returns a list of the courses student has enrolled in
// addNote: adds a note property to a course (takes code and note as arg)
  // if note already exists, appends note to existing one
// updateNote: updates a note for the course, replacing the existing note
// viewNotes: logs the notes for all the courses, courses w/o notes are not displayed

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    info: function() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse: function(course) {
      this.courses.push(course);
    },

    listCourses: function() {
      return this.courses;
    },

    findCourse: function(code) {
      for (let i = 0; i < this.courses.length; i += 1) {
        if (this.courses[i].code === code) return this.courses[i]
      }
    },

    addNote: function(code, note) {
      let course = this.findCourse(code);

      if (course.note) {
        course.note += '; ' + note;
      } else {
        course.note = note;
      }
    },

    updateNote: function(code, note) {
      let course = this.findCourse(code);
      if (course) course.note = note;
    },

    viewNotes: function() {
      this.courses.forEach(course => {
        if (course.note) console.log(course.name, ': ', course.note)
      });
    },
  }
}

> foo = createStudent('Foo', '1st');
> foo.info();
= Foo is a 1st year student
> foo.listCourses();
= [];
> foo.addCourse({ name: 'Math', code: 101 });
> foo.addCourse({ name: 'Advanced Math', code: 102 });
> foo.listCourses();
= [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
> foo.addNote(101, 'Fun course');
> foo.addNote(101, 'Remember to study for algebra');
> foo.viewNotes();
= Math: Fun Course; Remember to study for algebra
> foo.addNote(102, 'Difficult subject');
> foo.viewNotes();
= Math: Fun Course; Remember to study for algebra
= Advanced Math: Difficult Subject
> foo.updateNote(101, 'Fun course');
> foo.viewNotes();
= Math: Fun Course
= Advance Math: Difficult Subject

// School
// Create a school object
// The school object uses the stuent obj
// It has methods that use and update info about the student

// addStudent: Adds a student by creating a new student and adding th student
  // to a collection of students, year can only be 1st, 2nd, 3rd, 4th, or 5th
  // Returns a student obj if valid, otherwise logs Invalid Year
// enrollStudent: enrolls a student in a course
// addGrade: adds the grade of a student for a course
// getReportCard: logs the grades of a student for all courses, if the course
  // has no grade, it uses in progress as the grade
// courseReport: logs the grades of all students for a given course name
  // only student with grades are part of the course report

function createSchool(name) {
  return {
    name: name,
    students: [],
    courses: [],

    addCourse: function(name, code) {
      this.courses.push({ name: name, code: code });
    },

    addStudent: function(name, year) {
      const validYears = ['1st', '2nd', '3rd', '4th', '5th'];
      if (validYears.includes(year)) {
        let student = createStudent(name, year);
        this.students.push(student)
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    findStudent: function(name) {
      for (let i = 0; i < this.students.length; i += 1) {
        if (this.students[i].name === name) return this.students[i];
      }
    },

    findCourse: function(code) {
      for (let i = 0; i < this.courses.length; i += 1) {
        if (this.courses[i].code === code) return this.courses[i]
      }
    },

    enrollStudent: function(student, courseCode) {
      let course = this.findCourse(courseCode);

      if (student && course) {
        if (course.students) {
          course.students.push(student);
        } else {
          course.students = [student];
        }

        student.addCourse({ name: course.name, code: course.code });
      }
    },

    addGrade: function(student, grade, courseCode) {
      let course = student.findCourse(courseCode);

      if (student && course) course.grade = grade;
    },

    getReportCard: function(student) {
      student.courses.forEach(course => {
        console.log(course.name + ': ' + (course.grade || 'In progress'));
      });
    },

    findCourseCode: function(courseName) {
      for (let i = 0; i < this.courses.length; i += 1) {
        if (this.courses[i].name === courseName) {
          return this.courses[i].code;
        }
      }
    },

    getStudentGrade: function(student, course) {
      return student.findCourse(course).grade;
    },

    getCourseStats: function(course) {
      let totalGrade = 0;

      let gradeStats = course.students.reduce((stats, student) => {
        let grade = this.getStudentGrade(student, course.code);
        if (grade !== undefined) {
          totalGrade += grade
          return stats.concat(student.name + ': ' + grade);
        } else {
          return stats;
        }
      }, []);

      if (totalGrade === 0) return;
      let average = (totalGrade / gradeStats.length).toFixed(2);
      return gradeStats.concat('---',  `Course Average: ${average}`);
    },

    courseReport: function(courseName) {
      let courseCode = this.findCourseCode(courseName);
      let course = this.findCourse(courseCode);
      let courseStats = this.getCourseStats(course);
      if (!courseStats) return;

      console.log([`=${courseName} Grades=`].concat(courseStats).join('\n'));
    },
  }
}
