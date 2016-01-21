// Callback hell

doAsync1('hello', function (result1) {
  doAsync2(result1, function (result2) {
    doAsync3(result2, function (result3) {
      console.log(result3);
    });
  });
});



// Async functions (ES2016!)

async function foo() {
  var bar = await doAsync1('hello');
  var baz = await doAsync2(bar);
  var quux = await doAsync3(baz);

  console.log(quux);
}



// Callback hell with error handling

doAsync1('hello', function (err, result1) {
  if (err) {
    throw err;
  }

  doAsync2(result1, function (err, result2) {
    if (err) {
      throw err;
    }

    doAsync3(result2, function (err, result3) {
      if (err) {
        throw err;
      }

      doAsync4(result3, function (err, result4) {
        if (err) {
          throw err;
        }

        doAsync5(result4, function (err, result5) {
          if (err) {
            throw err;
          }

          console.log(result5);
        });
      });
    });
  });
});





























doAsync1('hello').then(function (result1) {
  return doAsync2(result1);
}).then(function (result2) {
  return doAsync3(result2);
}).then(function (result3) {
  return doAsync4(result3);
}).then(function (result4) {
  return doAsync5(result4);
}).then(function (result5) {
  console.log(result5);
});
.catch(function (err) {
  throw err;
});


doAsync1('hello')
.then(doAsync2)
.then(doAsync3)
.then(doAsync4)
.then(doAsync5)
.then(console.log.bind(console));








































doAsync1('hello')
.then(result1 => doAsync2(result1))
.then(result2 => doAsync3(result2))
.then(result3 => doAsync4(result3))
.then(result4 => doAsync5(result4))
.then(result5 => {
  console.log(result5);
})
.catch(err => {
  throw err;
});
