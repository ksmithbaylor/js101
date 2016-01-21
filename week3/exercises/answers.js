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

test('By default, `this` is the global object', function () {
  function foo() {
    assert(this === window);
  }

  foo();
});

test('In strict mode, `this` is undefined by default', function () {
  function foo() {
    'use strict';
    assert(this === undefined);
  }

  foo();
});

test('If called on an object, `this` is that object', function () {
  var obj = {
    foo: function () {
      assert(this === obj);
    }
  };

  obj.foo();
});

test('If called with `call`, `this` is the specified object', function () {
  var obj = {};

  function foo() {
    assert(this === obj);
  }

  foo.call(obj);
});

test('If called with `apply`, `this` is the specified object', function () {
  var obj = {};

  function foo(arg1, arg2) {
    assert(arg1 === 3);
    assert(arg2 === 4);
    assert(this === obj);
  }

  foo.apply(obj, [3, 4]);
});

test('If bound with `bind`, `this` will always be the specified object', function () {
  var obj = {};

  var redHerring = {
    foo: function () {
      assert(this === obj);
    }.bind(obj)
  };

  redHerring.foo();
});

test('If called as a constructor, this will be a new object', function () {
  var thisInsideConstructor;

  function foo() {
    thisInsideConstructor = this;
  }

  var newFoo = new foo();

  assert(thisInsideConstructor === newFoo);
});

test('Object literals are constructed with the `Object` built-in', function () {
  var obj = {};
  assert(obj.constructor === Object);
});

test('The prototype of an object literal is the prototype of `Object`', function () {
  var obj = {};
  assert(Object.getPrototypeOf(obj) === Object.prototype);
});

test('Functions have a `.prototype` property, but objects do not', function () {
  var obj = {};

  function foo() {
    // Empty, just for illustration
  }

  assert(typeof foo.prototype === 'object');
  assert(typeof obj.prototype === 'undefined');
});

test('Objects can be linked together with a prototype chain', function () {
  var a = {};
  var b = Object.create(a);
  var c = Object.create(b);

  assert(Object.getPrototypeOf(c) === b);
  assert(Object.getPrototypeOf(b) === a);
  assert(Object.getPrototypeOf(a) === Object.prototype);
});

test('Property access delegates up the prototype chain', function () {
  var a = { one: 1, two: 2 };

  var b = Object.create(a);
  b.three = 3;

  assert(b.one === 1);
  assert(b.two === 2);
  assert(b.three === 3);
});

test('The top of the prototype chain is null', function () {
  assert(Object.getPrototypeOf(Object.prototype) === null);
});

test('Pseudo-classes are one way to do "inheritance" in JavaScript', function () {
  // Visualizing the prototype chain (yes, it's CONFUSING!):
  // See https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch6.md#mental-models-compared
  //
  //              null
  //               |
  //        Object.prototype
  //       /                \
  // Object          Animal.prototype
  //                /        |       \
  //          Animal  Bird.prototype  Dog.prototype
  //                 /              \              \
  //             Bird      Parakeet.prototype       Dog
  //                      /
  //              Parakeet

  function Animal() {
    this.legs = 4;
    this.sound = 'rawr';
  }

  Animal.prototype.speak = function speak() {
    return this.sound;
  };

  Animal.prototype.howManyLegs = function howManyLegs() {
    return this.legs;
  };

  function Dog() {
    Animal.call(this);
    this.sound = 'woof';
  }

  Dog.prototype = Object.create(Animal.prototype);

  function Bird() {
    Animal.call(this);
    this.sound = 'tweet';
    this.legs = 2;
  }

  Bird.prototype = Object.create(Animal.prototype);

  function Parakeet() {
    Bird.call(this);
    this.sound = 'cheep';
  }

  Parakeet.prototype = Object.create(Bird.prototype);

  var myAnimal = new Animal();
  var myDog = new Dog();
  var myBird = new Bird();
  var myParakeet = new Parakeet();

  assert(myAnimal.speak() === 'rawr');
  assert(myAnimal.howManyLegs() === 4);
  assert(myDog.speak() === 'woof');
  assert(myDog.howManyLegs() === 4);
  assert(myBird.speak() === 'tweet');
  assert(myBird.howManyLegs() === 2);
  assert(myParakeet.speak() === 'cheep');
  assert(myParakeet.howManyLegs() === 2);

  assert(Object.getPrototypeOf(myParakeet) === Parakeet.prototype);
  assert(Object.getPrototypeOf(Parakeet.prototype) === Bird.prototype);
  assert(Object.getPrototypeOf(Bird.prototype) === Animal.prototype);
  assert(Object.getPrototypeOf(Animal.prototype) === Object.prototype);
});

test('Plain objects are a WAY better way to do "inheritance"', function () {
  // Visualizing the prototype chain (MUCH better!):
  // See https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch6.md#mental-models-compared
  //
  //              null
  //               |
  //        Object.prototype
  //       /       |
  // Object      Animal
  //            /      \
  //           Dog    Bird
  //                   |
  //                Parakeet

  var Animal = {
    legs: 4,
    sound: 'rawr',
    speak: function speak() {
      return this.sound;
    },
    howManyLegs: function howManyLegs() {
      return this.legs;
    }
  };

  var Dog = Object.create(Animal);
  Dog.sound = 'woof';

  var Bird = Object.create(Animal);
  Bird.legs = 2;
  Bird.sound = 'tweet';

  var Parakeet = Object.create(Bird);
  Parakeet.sound = 'cheep';

  var myAnimal = Object.create(Animal);
  var myDog = Object.create(Dog);
  var myBird = Object.create(Bird);
  var myParakeet = Object.create(Parakeet);

  assert(myAnimal.speak() === 'rawr');
  assert(myAnimal.howManyLegs() === 4);
  assert(myDog.speak() === 'woof');
  assert(myDog.howManyLegs() === 4);
  assert(myBird.speak() === 'tweet');
  assert(myParakeet.speak() === 'cheep');
  assert(myParakeet.howManyLegs() === 2);

  assert(Object.getPrototypeOf(myParakeet) === Parakeet);
  assert(Object.getPrototypeOf(Parakeet) === Bird);
  assert(Object.getPrototypeOf(Bird) === Animal);
  assert(Object.getPrototypeOf(Animal) === Object.prototype);
});
