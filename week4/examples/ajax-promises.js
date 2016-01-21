ajax('users').then(function (users) {
  console.log('Users are: ' + users);
  return Promise.all(users.map(function (user) {
    return ajax('todos/' + user).then(function (todos) {
      console.log('The user ' + user + ' has todos: ' + todos);
    });
  }));
});








function ajax(url) {
  var todos = {
    'Bob': ['Mow the lawn', 'Buy milk'],
    'Alice': ['Book flight', 'Finish homework'],
    'Sue': ['Call mom', 'Pay bills', 'Return stuff']
  };

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (url === 'users') {
        resolve(['Bob', 'Alice', 'Sue']);
      } else {
        var user = url.split('/')[1];
        resolve(todos[user]);
      }
    }, Math.floor(Math.random() * 5000));
  });
}
