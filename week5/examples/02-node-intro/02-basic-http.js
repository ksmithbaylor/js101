var http = require('http');

// Create http server
var server = http.createServer(function (request, response) {
  // Write http status code and Content-Type header
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  // Write some text and end the response
  response.end('hello world');
});

// Start the server on port 12345
server.listen(12345);
