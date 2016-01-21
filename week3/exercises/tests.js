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
    assert(this === CHANGEME);
  }

  foo();
});

test('In strict mode, `this` is undefined by default', function () {
  function foo() {
    'use strict';
    assert(this === CHANGEME);
  }

  foo();
});

test('If called on an object, `this` is that object', function () {
  var obj = {
    foo: function () {
      assert(this === CHANGEME);
    }
  };

  obj.foo();
});

test('If called with `call`, `this` is the specified object', function () {
  var obj = {};

  function foo() {
    assert(this === CHANGEME);
  }

  foo.call(obj);
});

test('If called with `apply`, `this` is the specified object', function () {
  var obj = {};

  function foo(arg1, arg2) {
    assert(arg1 === CHANGEME);
    assert(arg2 === CHANGEME);
    assert(this === CHANGEME);
  }

  foo.apply(obj, [3, 4]);
});

test('If bound with `bind`, `this` will always be the specified object', function () {
  var obj = {};

  var redHerring = {
    foo: function () {
      assert(this === CHANGEME);
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

  assert(thisInsideConstructor === CHANGEME);
});

test('Object literals are constructed with the `Object` built-in', function () {
  var obj = {};
  assert(obj.constructor === CHANGEME);
});

test('The prototype of an object literal is the prototype of `Object`', function () {
  var obj = {};
  assert(Object.getPrototypeOf(obj) === CHANGEME);
});

test('Functions have a `.prototype` property, but objects do not', function () {
  var obj = {};

  function foo() {
    // Empty, just for illustration
  }

  assert(typeof foo.prototype === CHANGEME);
  assert(typeof obj.prototype === CHANGEME);
});

test('Objects can be linked together with a prototype chain', function () {
  var a = {};
  var b = Object.create(a);
  var c = Object.create(b);

  assert(Object.getPrototypeOf(c) === CHANGEME);
  assert(Object.getPrototypeOf(b) === CHANGEME);
  assert(Object.getPrototypeOf(a) === CHANGEME);
});

test('Property access delegates up the prototype chain', function () {
  var a = { one: 1, two: 2 };

  var b = Object.create(a);
  b.three = 3;

  assert(b.one === CHANGEME);
  assert(b.two === CHANGEME);
  assert(b.three === CHANGEME);
});

test('The top of the prototype chain is null', function () {
  assert(Object.getPrototypeOf(Object.prototype) === CHANGEME);
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

  assert(myAnimal.speak() === CHANGEME);
  assert(myAnimal.howManyLegs() === CHANGEME);
  assert(myDog.speak() === CHANGEME);
  assert(myDog.howManyLegs() === CHANGEME);
  assert(myBird.speak() === CHANGEME);
  assert(myBird.howManyLegs() === CHANGEME);
  assert(myParakeet.speak() === CHANGEME);
  assert(myParakeet.howManyLegs() === CHANGEME);

  assert(Object.getPrototypeOf(myParakeet) === CHANGEME);
  assert(Object.getPrototypeOf(Parakeet.prototype) === CHANGEME);
  assert(Object.getPrototypeOf(Bird.prototype) === CHANGEME);
  assert(Object.getPrototypeOf(Animal.prototype) === CHANGEME);
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

  assert(myAnimal.speak() === CHANGEME);
  assert(myAnimal.howManyLegs() === CHANGEME);
  assert(myDog.speak() === CHANGEME);
  assert(myDog.howManyLegs() === CHANGEME);
  assert(myBird.speak() === CHANGEME);
  assert(myParakeet.speak() === CHANGEME);
  assert(myParakeet.howManyLegs() === CHANGEME);

  assert(Object.getPrototypeOf(myParakeet) === CHANGEME);
  assert(Object.getPrototypeOf(Parakeet) === CHANGEME);
  assert(Object.getPrototypeOf(Bird) === CHANGEME);
  assert(Object.getPrototypeOf(Animal) === CHANGEME);
});
