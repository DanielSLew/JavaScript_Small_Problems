const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

questions.forEach(({ id, options }, idx) => {
  questions[idx].options = options.map(option => ({ id, option }));
});

const $form = $('form');
const $submit = $('#submit');
const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

const questions_template = Handlebars.compile($('#questions').html());
$form.html(questions_template({ questions }));

function enableSubmit() {
  let questions = Object.keys(answerKey);    
  let responses = $form.serializeArray().reduce((r, {name, value}) => {
        return { ...r, [name]: value };
      }, {});

  questions.forEach(id => {
    if (responses[id] === answerKey[id]) {
      $('#correct-' + id).toggle(true);
    } else if (!responses[id]) {
      $('#answer-' + id).text(`You did not answer this question. Correct answer is: ` + answerKey[id]).toggle(true);
    } else {
      $('#answer-' + id).text(`Wrong answer. Correct answer is: ` + answerKey[id]).toggle(true);
    }
  });
  $submit.off('click');  
}

$submit.on('click', enableSubmit);

$('#reset').on('click', () => {
  $('p[id]').toggle(false);
  $form[0].reset();
  $submit.on('click', enableSubmit);
});


function delayLog() {
  for (let i = 1; i <= 10; i++) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  }
} 

delayLog();
function findItems() {
  let checkedItems = document.querySelectorAll('input:checked');
  let uncheckedItems = document.querySelectorAll('input:not(:checked)');

  let checked = [...checkedItems].map(item => item.parentNode.textContent.trim())
  let unchecked = [...uncheckedItems].map(item => item.parentNode.textContent.trim())

  return [ checked, unchecked ]; 
}


function walkList(node = document) {
  if (node.tagName === 'LI') {
    console.log(node.textContent.match(/\w+/)[0]);
  }

  for (let i = 0; i < node.childNodes.length; i++) {
    walkList(node.childNodes[i]);
  }
}


function rewrite() {
  let body = document.body;
  let h1 = document.createElement('h1');
  h1.textContent = "The Day's News";
  body.replaceChild(h1, document.querySelector('h2'));

  let div = document.querySelector('.front-page');
  let archives = div.querySelector('p');

  let article = document.createElement('article');
  article.className = 'breaking';

  let p = document.createElement('p');
  p.textContent = 'Fire breaks out at the old factory';

  let stories = document.createElement('p');
  let link = document.createElement('a');
  link.setAttribute('href', '/stories/15');
  link.textContent = 'Read More';

  stories.appendChild(link);

  article.appendChild(p);
  article.appendChild(stories);

  div.insertAdjacentElement("afterbegin", article);
}

function helloLater(n) {
  setTimeout(function() {
    console.log('Hello, world!');
  }, n * 1000)
}

document.addEventListener('DOMContentLoaded', function() {
  let liItems = document.querySelectorAll('li');

  console.log(liItems.length);
});

document.addEventListener('click', function(e) {
  if (e.target.tagName = 'A') {
    e.preventDefault();
  }
})

let data = {title: 'Buy Milk', completed: true};
let xhr = new XMLHttpRequest;
xhr.open('PUT', 'my-todo-app.com/todos/15');
xhr.contentType = 'application/json';
xhr.responseType = 'json';

xhr.addEventListener('load', function(e) {
  let response = e.target.response;

  console.log(`title: ${response.title}`);
  console.log(`completed: ${response.completed}`);
})

xhr.send(JSON.stringify(data));

$('span.special').css({
  backgroundColor: "#dd2341";
  color: "#ffffff";
  border: "1px solid #1dee24";
});

$('ul.featured').on('click', 'li', function(e) {
  console.log($(this).html());
});

let xhr = new XMLHttpRequest();
xhr.open('GET', 'example.com');
xhr.send()
