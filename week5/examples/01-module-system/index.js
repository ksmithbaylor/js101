// Import the `a` module from a local file called `a.js`
// (if it is a .js file, the .js extension is not necessary.)
var a = require('./a');

// Print out that we are now executing the index file
console.log('in index.js');

// Print out the value contained in the `a` module we imported
console.log(a.abc);
