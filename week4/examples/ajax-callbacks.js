ajax('users', function (users) {
  console.log('Users are: ' + users);
  users.forEach(function (user) {
    ajax('todos/' + user, function (todos) {
      console.log('The user ' + user + ' has todos: ' + todos);
    });
  });
});








function ajax(url, cb) {
  var todos = {
    'Bob': ['Mow the lawn', 'Buy milk'],
    'Alice': ['Book flight', 'Finish homework'],
    'Sue': ['Call mom', 'Pay bills', 'Return stuff']
  };

  setTimeout(function () {
    if (url === 'users') {
      cb(['Bob', 'Alice', 'Sue']);
    } else {
      var user = url.split('/')[1];
      cb(todos[user]);
    }
  }, Math.floor(Math.random() * 3000));
}
