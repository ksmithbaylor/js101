// Import the `b` module
var b = require('./b');

// Print out that we are executing the `a` module now
console.log('in A');

// Print out a value that was exported from the `b` module
console.log(b.def);

// Export an object from the `a` module to whoever requires this file
module.exports = {
  abc: 123
};
