let $commands = $('#commands');
let $content  = $('#content');
let buttons   = [
  { value: 'bold', class: "fas fa-bold"}, { value: 'italic', class: "fas fa-italic"},
  { value: 'underline', class: "fas fa-underline" }, { value: 'strikeThrough', class: "fas fa-strikethrough" },
  { value: 'createLink', class: "fas fa-link" }, { value: 'insertUnorderedList', class: "fas fa-list-ul" },
  { value: 'insertOrderedList', class: "fas fa-list-ol" }, { value: 'justifyRight', class: "fas fa-align-right" },
  { value: 'justifyLeft', class: "fas fa-align-left" }, { value: 'justifyCenter', class: "fas fa-align-center" },
  { value: 'justifyFull', class: "fas fa-align-justify" },
];

let template = Handlebars.compile($('#command_buttons').html());
$commands.html(template({ buttons }));


function executeCommand(e) {
  let command = $(e.target).val();
  let url;

  if (command === 'createLink') url = prompt('Attach a URL here:');
  
  document.execCommand(command, null, url);
  $content.trigger('focus');
}

$commands.on('click', 'button', executeCommand);
