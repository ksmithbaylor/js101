var http = require('http');
var fs = require('fs');

// Create http server
var server = http.createServer(function (request, response) {
  // Get the url they requested
  var url = request.url;

  // If they just requested the root, respond with the home page
  if (url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('This is the home page');
  }

  // Strip off the leading '/'
  var fileName = url.substr(1);

  // Read the file and send it to the response
  fs.readFile(fileName, function (err, result) {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end(err.message);
    } else {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(result.toString());
    }
  });
});

// Start the server on port 12345
server.listen(12345);
