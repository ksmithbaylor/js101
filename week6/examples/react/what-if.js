// Suppose you have a div that is supposed to change colors
// based on some variable. The div looks like this:

<div id="hello" color="blue"></div>

// And to change the color, you would do something like:

colorInput.addEventListener('change', function (event) {
  var newColor = event.target.value;
  document.getElementById('hello').style.color = newColor;
});

// But this means that we are essentially trying to "sync up"
// the state from our input field and the actual color
// in the DOM.
//
// What if something else on the page came in and changed
// the color of the div? Then the input field is not
// guaranteed to reflect the color of the div.
//
// It would be nice if we could write our div this way:

DOM(
  'div',                          // tag name
  { id: "hello", color: "blue" }, // attributes
  []                              // children (none here)
);

// Then, you could write a function to make a new div every
// time you wanted to change the text:

function colorDiv(color) {
  return DOM(
    'div',
    { id: "hello", color: color },
    []
  );
}

// And then, just call this function every time your color
// changed to swap out the old div for the newly-generated one.

// Let's look at a simpler example:

<p>Take out the trash</p>

// This is an item in a todo list. Using our
// hypothetical fantasy-land syntax, we could
// write a function to generate todo list items
// like this:

function todoItem(text) {
  return DOM(
    'p',      // Tag name
    null,     // No attributes
    [text]    // The text is the only child
  );
}

// Then, to make a whole list of todo items
// based on an array of strings, you could do:

function todoList(items) {
  return DOM(
    'div',
    null,
    items.map(todoItem)
  );
}

// It would work like this:

var items = [
  'Take out the trash',
  'Be awesome',
  'Do that other thing'
];

var list = todoList(items);

// The list is now:

DOM('div', null, [
  DOM('p', null, ['Take out the trash']),
  DOM('p', null, ['Be awesome']),
  DOM('p', null, ['Do that other thing'])
]);

// Just to be more clear, it would look like this
// in plain HTML:

<div>
  <p>Take out the trash</p>
  <p>Be awesome</p>
  <p>Do that other thing</p>
</div>

// So now, if our list of todo items changes, we
// can just call our function again to give us
// a new list:

var newItems = [ /* different todos */ ];
list = todoList(newItems);

// That way, we don't have to worry about what our
// DOM looked like before. Our function just returns
// a description of what the page should look like
// given some input data.
