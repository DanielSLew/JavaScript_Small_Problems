let todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

let $todos             = $('#todos');
let $confirmationPage  = $('#overlay');
let $confirmDelete     = $('#delete');
let $contextMenu       = $('#contextMenu');
let $contextMenuDelete = $contextMenu.find('li.delete');

let template = Handlebars.compile($('#todo_items').html());
$todos.html(template({ todos: todo_items }));

function confirmDelete(e) {
  let $button = $(e.target);
  let id      = $button.data('id');

  $confirmDelete.data('id', id);
  $confirmationPage.toggle();
  $contextMenu.toggle();
}

function deleteItem(e) {
  let $button = $(e.target);

  if ($button[0] === $confirmDelete[0]) {
    let id = $button.data('id');
    $todos.find(`div[data-id="${id}"]`).remove();
  }

  $confirmationPage.toggle();
}

function showContextMenu(e) {
  e.preventDefault();

  $contextMenuDelete.data('id', $(e.target).data('id'));
  $contextMenu.css({
    top: e.clientY,
    left: e.clientX,
  }).toggle();
}

const toggleHighlight = e => $(e.target).toggleClass('highlight');

// $todos.on('click', 'button', confirmDelete);
$todos.on('contextmenu', 'p', showContextMenu);

$confirmationPage.on('click', 'button', deleteItem);

$contextMenu.on('mouseleave', () => $contextMenu.toggle());
$contextMenu.find('li').hover(toggleHighlight);
$contextMenuDelete.on('click', confirmDelete)

