var http = require('http');
var fs = require('fs');

// Create http server
var server = http.createServer(function (request, response) {
  // Read a file
  fs.readFile('hello.txt', function (err, result) {
    if (err) {
      // Send an error status code and message
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end(err.message);
    } else {
      // Send a success status code and the file contents
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(result.toString());
    }
  });
});

// Start the server on port 12345
server.listen(12345);
