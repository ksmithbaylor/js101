// Simple for loop

var sum = 0;

for (var i = 1; i <= 1000; i++) {
  if (i % 3 === 0 || i % 5 === 0) {
    sum += i;
  }
}

console.log(sum);





// Functional approach

function range(upperLimit) {
  return Array.apply(null, Array(upperLimit + 1)).map(function (_, i) {
    return i + 1;
  });
}

var sum = range(1000).filter(function (x) {
  return x % 3 === 0 || x % 5 === 0;
}).reduce(function (a, b) {
  return a + b;
});

console.log(sum);





// ES2015 magic

function range(upperLimit) {
  return Array.from(Array(upperLimit + 1).keys());
}

var sum = range(1000)
  .filter(x => x % 3 === 0 || x % 5 === 0)
  .reduce((a, b) => a + b);

console.log(sum);
