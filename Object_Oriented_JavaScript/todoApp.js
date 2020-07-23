var Todo = (function() {
  var invalidTitle = (title) => {
    return (title.constructor !== String || title.length < 3);
  }

  var validProperties = ['title', 'month', 'year', 'description'];

  return {
    init: function(todoData) {
      var properties = Object.keys(todoData);
      validProperties.forEach(prop => this[prop] = String(todoData[prop] || '').trim());

      return invalidTitle(this.title) ? console.log('Invalid title') : this;
    },

    isWithinMonthYear: function(month, year) {
      return (this.month === month && this.year === year);
    },
  };
})();;

var TodoManager = {
  all: function(collection) {
    return function() {
      return collection.map(todo => Object.assign({}, todo));
    };
  },

  completed: function(collection) {
    return function() {
      var completedTodos = [];

      collection.forEach(todo => {
        if (todo.completed === true) completedTodos.push(Object.assign({}, todo));
      });

      return completedTodos;
    };
  },

  todosWithDate: function(collection) {
    return function(month, year) {
      var todosWithinDate = [];

      collection.forEach(todo => {
        if (todo.isWithinMonthYear(month, year)) {
          todosWithinDate.push(Object.assign({}, todo));
        }
      });

      return todosWithinDate;
    };
  },

  completedTodosWithDate: function(collection) {
    return function(month, year) {
      var completedTodosWithinDate = [];

      collection.forEach(todo => {
        if (todo.isWithinMonthYear(month, year) && todo.completed === true) {
          completedTodosWithinDate.push(Object.assign({}, todo));
        }
      });

      return completedTodosWithinDate;
    };
  },
};


var TodoList = (function() {
  var validMonth = (month) => Number(month) >= 1 && Number(month) <= 12;
  var validYear = (year) => Number(year) >= new Date().getFullYear() - 1;

  var id = 0;

  function generateNextId() {
    return id += 1;
  }

  function findIdxOfTodo(todos, id) {
    for (var i = 0; i < todos.length; i += 1) {
      if (todos[i].id === id) return i;
    }
  }

  function initializeTodoForList(uninitializedTodo) {
    var todo = Object.create(Todo).init(uninitializedTodo);

    if (!validMonth(todo.month)) todo.month = String(new Date().getMonth() + 1);
    if (!validYear(todo.year)) todo.year = String(new Date().getFullYear());
    
    todo.year      = String(todo.year);
    todo.completed = false;
    todo.id        = generateNextId();

    return todo;
  }

  return {
    init: function(todos) {
      var collection = [];

      if (todos.some(todo => !(Todo.isPrototypeOf(todo)))) return console.log('Invalid todo set');
      todos.forEach(todo => collection.push(initializeTodoForList(todo)));

      this.delete = function(id) {
        var idx = findIdxOfTodo(collection, id);
        if (idx >= 0) var deletedTodo = collection.splice(idx, 1)[0];

        if (deletedTodo) {
          console.log(`"${deletedTodo.title}" has successfully been deleted`);
        } else {
          console.log("Oops, we can't find a todo with that id");
        }
      };

      this.findTodo = function(id) {
        var idx = findIdxOfTodo(collection, id);

        if (idx >= 0) {
          return Object.assign({}, collection[idx]);
        } else {
          console.log("Oops, we can't find a todo with that id");
        }
      };

      this.updateTodo = function(id, updates) {
        var validProperties = ['title', 'completed', 'month', 'year', 'description'];
        var todo = collection[findIdxOfTodo(collection, id)];

        var validUpdates = Object.entries(updates).filter(entry => validProperties.includes(entry[0]));

        if (validUpdates.length === 0 || todo === undefined) {
          console.log("Oops, we couldn't update the todo");
        } else {
          Object.assign(todo, Object.fromEntries(validUpdates));
          console.log(`"${todo.title}" has been successfully updated`);
        }
      };

      this.add = function(todo) {
        if (Todo.isPrototypeOf(todo)) {
          collection.push(initializeTodoForList(todo));
          console.log(`"${todo.title}" has successfully been added`);
        } else {
          console.log("Oops, it looks like that's not a todo");
        }
      };

      Object.keys(TodoManager).forEach(method => {
        this[method] = TodoManager[method].call(this, collection);
      });

      return this;
    },
  };
})();


//********************************** TESTS **********************************//

var currentDate = new Date();
var currentMonth = String(currentDate.getMonth() + 1);
var currentYear = String(currentDate.getFullYear());

// Creating a todo that inherits from Todo
var todo1 = Object.create(Todo).init({
  title: 'Buy milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby'
});

console.log(Todo.isPrototypeOf(todo1), 1);

// Invalid title does not return Todo Object
var invalidTodo = Object.create(Todo).init({
  title: 'hi',
  month: '',
  year: 2020,
  description: 'this should fail',
});

console.log(invalidTodo === undefined && !(Todo.isPrototypeOf(invalidTodo)), 2);

var todo2 = Object.create(Todo).init({
  title: 'Buy apples',
  month: '',
  year: 2020,
  description: 'An apple a day',
});

// Creating a todo with only a title still works, other properties will default to ''
var todo3 = Object.create(Todo).init({
  title: 'Order Coffee',
});

console.log(Todo.isPrototypeOf(todo2) && Todo.isPrototypeOf(todo3), 3);

// Creating a todolist that inherits from TodoList
var list = Object.create(TodoList).init([todo1, todo2, todo3]);
console.log(TodoList.isPrototypeOf(list), 4);

// Cannot create a todolist unless all entries are valid todos
var invalidList = Object.create(TodoList).init([todo1, invalidTodo]);
console.log(!(TodoList.isPrototypeOf(invalidList)) &&
              invalidList === undefined, 5);

// Adding a valid and invalid todo
var todo4 = Object.create(Todo).init({
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
});

list.add(todo4);
console.log(list.findTodo(4).title === 'Buy chocolate', 6);

list.add({ 
  title: 'invalid todo',
  month:'1',
  year: '2020',
  description: 'this wont add' 
});
console.log(list.findTodo(5) === undefined, 7);

// Lists share ids, but do not share collections
var list2 = Object.create(TodoList).init([todo1]);
console.log(list2.findTodo(1) === undefined &&
            list.findTodo(1) !== undefined, 8);
console.log(list2.findTodo(5).title === 'Buy milk', 9);

// invalid month/year defaults to current month/year after added to TodoList
var foundTodo = list.findTodo(3);
console.log(foundTodo.month === currentMonth && foundTodo.year === currentYear, 10);

// Find a todo by id
foundTodo = list.findTodo(1);
console.log(foundTodo.id === 1, 11);

// Returned todos are copies
foundTodo.id = 12;
console.log(list.findTodo(12) === undefined, 12);

// deletes a todo using an id
var deletedTodo = list.delete(4);
console.log(list.findTodo(4) === undefined, 13);

// updates a todo using an id and an object
var updates = { completed: true }
console.log(foundTodo.completed === false, 14);

list.updateTodo(1, updates);
foundTodo = list.findTodo(1);
console.log(foundTodo.completed === true, 15);

// cannot update id
list.updateTodo(1, { id: 12 });
console.log(list.findTodo(12) === undefined, 16);

// updating a todo object does not update that todo object in the list
todo1.id = 12;
console.log(list.findTodo(12) === undefined, 17);

// list returns a copy of the todos in an array
var allTodos = list.all();
console.log(allTodos.length === 3, 18);
console.log(list.all()[0] !== allTodos[0], 19);

// completed returns a copy of todos with completed properties set to true
var completedTodos = list.completed();
console.log(completedTodos.length === 1 && completedTodos[0].completed === true, 20);
console.log(list.completed()[0] !== completedTodos[0], 21);

// todosWithDate returns an Array of todos that have the given month and year
var todosWithDate = list.todosWithDate(currentMonth, currentYear);
console.log(todosWithDate.length === 2, 22);
console.log(todosWithDate[0].month === currentMonth && todosWithDate[0].year === currentYear &&
            todosWithDate[1].month === currentMonth && todosWithDate[1].year === currentYear, 23);

// todosWithDate returns a copy of the todos
console.log(todosWithDate[0] !== list.todosWithDate(currentMonth, currentYear)[0], 24);

// todosWithDate completed only returns a copy of the todos in the specific date when completed equals true
var completedTodosWithDate = list.completedTodosWithDate(currentMonth, currentYear);
console.log(completedTodosWithDate.length === 0, 25);

foundTodo = list.findTodo(1);
var todoMonth = foundTodo.month;
var todoYear = foundTodo.year;

completedTodosWithDate = list.completedTodosWithDate(todoMonth, todoYear);
console.log(completedTodosWithDate.length === 1, 26);
console.log(completedTodosWithDate[0].month === todoMonth &&
            completedTodosWithDate[0].year === todoYear &&
            completedTodosWithDate[0].completed === true, 27);
