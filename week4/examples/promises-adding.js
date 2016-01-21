// With promises

function fetch(url) {
  return Promise.resolve(parseInt(url));
}

function add(getA, getB) {
  return Promise.all([ getA, getB ]).then(function (vals) {
    return vals[0] + vals[1];
  });
}

var a = fetch('3');
var b = fetch('4');

add(a, b).then(function (result) {
  console.log(result);
});





// Without promises :(

function fetch(url) {
  return function(cb) {
    cb(parseInt(url));
  };
}

function add(getA, getB, cb) {
  var a, b;

  getA(function (aVal) {
    a = aVal;

    if (b) {
      cb(a + b);
    }
  });

  getB(function (bVal) {
    b = bVal;

    if (a) {
      cb(a + b);
    }
  });
}

var a = fetch('3');
var b = fetch('4');

add(a, b, function (result) {
  console.log(result);
});
