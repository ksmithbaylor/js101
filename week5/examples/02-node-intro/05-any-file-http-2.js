var http = require('http');
var fs = require('fs');

// Factor out the common logic into a function
// so we aren't repeating ourselves everywhere
function respond(contents, response, err) {
  var statusCode = err ? 500 : 200;

  response.writeHead(statusCode, {
    'Content-Type': 'text/plain'
  });

  response.end(contents);
}

// Create http server
var server = http.createServer(function (request, response) {
  // Get the url they requested
  var url = request.url;

  // If they just requested the root, respond with the home page
  if (url === '/') {
    respond('This is the home page', response);
  }

  // Strip off the leading '/'
  var fileName = url.substr(1);

  // Read the file and send it to the response
  fs.readFile(fileName, function (err, result) {
    if (err) {
      respond(err.message, response, true);
    } else {
      respond(result.toString(), response);
    }
  });
});

// Start the server on port 12345
server.listen(12345);
