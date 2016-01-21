var fs = require('fs');

console.log('before reading file');

// Tell Node to start reading the file, and to run the
// callback when the results come back from the
// operating system
fs.readFile('hello.txt', function (err, result) {
  // If the file didn't exist or some other error
  if (err) {
    console.log('Some error happened:', err.message);
    return;
  }

  console.log('--------------');

  // result is a Buffer, so we need to turn it into a
  // string before we print it. `trim` gets rid of
  // leading and trailing whitespace
  var fileContents = result.toString().trim();
  console.log(fileContents);

  console.log('--------------');
});

// `fs.readFile` is async, so this will get printed
// before the file contents do
console.log('"after" reading file');

// If you uncomment the below lines, it will block the
// event loop by counting (this took about 10 seconds
// on my machine)
console.log('counting to ten billion for funsies...');
 for (var i = 0; i < 100000000000; i++);
console.log('done counting!');
