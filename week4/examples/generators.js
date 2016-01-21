function* counter() {
  var x = 0;

  while (x < 5) {
    yield x++;
  }
}

var count = counter();

debugger;

for (var i of count) {
  console.log(i);
}
