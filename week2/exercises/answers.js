// Instructions:
//
// Open up the `index.html` file in this folder in your browser, and you'll see
// that all of these tests are currently failing. Your job is to change all the
// CHANGEME variables in each test so that they all pass. You can save this file
// and refresh the browser window to run the tests again, and if one passes, it
// will turn green instead of red.
//
// You aren't allowed to change anything else about the existing tests, but feel
// free to write more of your own tests if you're curious to see how things
// work!
//
// When you're finished with the exercises or if you have any questions, send me
// a message on Slack.


// 1
test('Functions have access to locally-scoped variables', function () {
  function foo() {
    var bar = 42;
    assert(bar === 42);
  }

  foo();
});


// 2
test("Functions have access to variables in their parent's scope", function () {
  var baz = 'hello';

  function foo() {
    assert(baz === 'hello');
  }

  foo();
});


// 3
test('Variable declarations are "hoisted" to the top of their scope', function () {
  assert(baz === undefined);

  var baz = 'hey there';

  assert(baz === 'hey there');
});


// 4
test("Variables aren't accessible from outside their scope", function () {
  function foo() {
    var bar = 3;
  }

  foo();

  try {
    console.log(bar);
  } catch (err) {
    assert(err.name === 'ReferenceError');
  }
});


// 5
test('Variable names "shadow" variables in their parent scope', function () {
  var bar = 'yes';

  function foo() {
    var bar = 'no';
    assert(bar === 'no');
  }

  foo();
});


// 6
test('Function arguments "shadow" variables in their parent scope', function () {
  var bar = 3;

  function foo(bar) {
    assert(bar === 4);
  }

  foo(4);
});

// 7
test('Function names are only accessible inside their bodies', function () {
  var foo = function bar() {
    assert(foo.name === 'bar');
    assert(bar.name === 'bar');
  };

  foo();

  assert(foo.name === 'bar');

  try {
    bar();
  } catch (err) {
    assert(err.name === 'ReferenceError');
  }
});


// 8
test('Objects can have functions as properties', function () {
  var obj = {
    foo: function () {
      return 3;
    },

    bar: function () {
      return 4;
    }
  };

  assert(typeof obj === 'object');
  assert(typeof obj.foo === 'function');
  assert(typeof obj.foo() === 'number');
  assert(obj.bar() === 4);
});


// 9
test('Functions can return objects with function properties', function () {
  function foo() {
    return {
      bar: function () {
        return 'asdf';
      }
    };
  }

  assert(typeof foo() === 'object');
  assert(typeof foo().bar === 'function');
  assert(foo().bar() === 'asdf');
});


// 10
test('Functions can return other functions directly', function () {
  function foo() {
    return function () {
      return 42;
    };
  }

  assert(typeof foo() === 'function');
  assert(foo()() === 42)
  assert(typeof foo()() === 'number');
});


// 11
test('Functions can access the arguments of the function in which they were defined', function () {
  function prefixer(prefix) {
    return function (str) {
      return prefix + str;
    };
  }

  var simonSays = prefixer('Simon says: ');
  assert(simonSays('JavaScript is awesome!') === 'Simon says: JavaScript is awesome!');
});


// 12
test('Functions can access variables inside the function in which they were defined', function () {
  function canadianizer() {
    var whatCanadiansSay = ', eh?';

    return function (str) {
      return str + whatCanadiansSay;
    };
  }

  var canadianize = canadianizer();
  assert(canadianize('Nice weather') === 'Nice weather, eh?');
});


// 13
test('"Custom" functions can be generated on-the-fly', function () {
  function multiplyBy(num) {
    return function (x) {
      return x * num;
    };
  }

  var multiplyBy5 = multiplyBy(5);
  assert(multiplyBy5(20) === 100);

  var multiplyByNegative1 = multiplyBy(-1);
  assert(multiplyByNegative1(7) === -7);
});


// 14
test('Calling the same function twice creates two separate closures', function () {
  function multiplyByRandomNumber() {
    var theRandomNumber = Math.random();

    return function (x) {
      return x * theRandomNumber;
    };
  }

  var foo = multiplyByRandomNumber();
  assert(foo(7) === foo(7));

  var bar = multiplyByRandomNumber();
  assert(bar(21) === bar(21));

  assert(foo(10) !== bar(10)); // (Unless you are extremely lucky)
});


// CHALLENGE!
test('This is actually insane and you should never do this', function () {
  function foo() {
    return {
      bar: function () {
        return function () {
          return [
            function () {
              return {
                baz: {
                  quux: function () {
                    return [
                      {},
                      [],
                      {
                        what: [
                          7,
                          function () {
                            return function () {
                              return function () {
                                return function () {
                                  return function () {
                                    return function () {
                                      return 42;
                                    };
                                  };
                                };
                              };
                            };
                          }
                        ]
                      }
                    ];
                  }
                }
              };
            }
          ];
        };
      }
    };
  }

  // Yes, I want you to start at `foo` and dig all the way down to 42. :)
  assert(42 === foo().bar()()[0]().baz.quux()[2].what[1]()()()()()());
});


// BONUS - Recursion! Because I said I would.
test('Functions can call themselves', function () {
  function fibonacci(n) {
    if (n < 0) {
      return undefined;
    }

    if (n < 2) {
      return 1;
    }

    return fibonacci(n-1) + fibonacci(n-2);
  }

  assert(fibonacci(0) === 1);
  assert(fibonacci(1) === 1);
  assert(fibonacci(2) === 2);
  assert(fibonacci(3) === 3);
  assert(fibonacci(4) === 5);
  assert(fibonacci(5) === 8);
  assert(fibonacci(6) === 13);
  assert(fibonacci(7) === 21);
  assert(fibonacci(8) === 34);
});
