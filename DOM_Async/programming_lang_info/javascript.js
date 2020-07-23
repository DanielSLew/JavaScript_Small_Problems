var languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  },

  {
    name: 'C',
    description: 'This is a short description of C',
  }
];

// Only show the first 120 chars to start for each description
// Insert a span with between the 120chars and the end
// hide all the spans to begin w/
// add a click event on the button
// when it is clicked, toggle the span

let template = Handlebars.compile($('#languages_template').html());
let $button;
let $p;

function formatLanguagesData(languages) {
  languages.forEach(language => {
    let desc = language.description;
    if (desc.length > 120) {
      language.button = true;
      language.description = desc.slice(0, 120) + ' ...' + '<span>' + desc.slice(120) + '</span>'
    }
  });
}

function renderPage() {
  formatLanguagesData(languages);
  $('#languages').html(template({ languages: languages }));
  $('span').hide();
}

function renderDescriptionChange(original, replacement, buttonText) {
  $p.html((i, html) => html.replace(original, replacement));
  $button.text(buttonText);
}

$('#languages').on('click', 'button', function(e) {
  $button = $(e.target);
  $p      = $button.prev();

  if ($button.text() === 'Show more') {
    renderDescriptionChange(' ...<span', '<span', 'Show less');
  } else {
    renderDescriptionChange('<span', ' ...<span', 'Show more');
  }

  $p.find('span').toggle();
});

renderPage();

