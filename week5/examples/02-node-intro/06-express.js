var express = require('express');

// Create an express app
var app = express();

// Set up our first route. When the user hits the
// '/' url, this callback will get called
app.get('/', function (request, response) {
  // No need to write headers, express takes
  // care of that for us
  response.send('This is the home page');
});

// Another route
app.get('/other', function (request, response) {
  response.send('Other page');
});

// If none of the above routes matched, look for
// a file in the current directory (__dirname)
// with that filename. `express.static` is an
// example of express "middleware".
app.use(express.static(__dirname));

// Start the app on port 12345
app.listen(12345);
