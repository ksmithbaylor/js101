var express = require('express');
var chalk = require('chalk');

// Create an express app
var app = express();

app.use(function (request, response, next) {
  console.log(chalk.blue(new Date().toString()) +
              chalk.green(': Someone requested ') +
              chalk.yellow(request.path));
  next();
});

// Set up our first route. When the user hits the
// '/' url, this callback will get called
app.get('/', function (request, response) {
  // No need to write headers, express takes care of that for us
  response.send('This is the home page');
});

// If none of the above routes matched, look for
// a file in the current directory (__dirname)
// with that filename. `express.static` is an
// example of express "middleware".
app.use(express.static(__dirname));

// Start the app on port 12345
app.listen(12345);
