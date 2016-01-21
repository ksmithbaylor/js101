console.log('before');

setTimeout(function () {
  console.log('async');
}, 5000);

// Count to ten billion for funsies!
for (var i = 0; i < 10000000000; i++) {
    // do nothing, just count!
}

console.log('after');
