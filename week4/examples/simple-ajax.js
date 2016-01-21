var request = require('superagent'); // need to `npm install`

var baseURL = 'jsonplaceholder.typicode.com';

request(baseURL + '/todos', function (err, res) {
  var todos = res.body;
  console.log('There are', todos.length, 'todos');
});
