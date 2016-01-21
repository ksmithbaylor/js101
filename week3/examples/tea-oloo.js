var Tea = {
  color: 'herbal',
  caffeine: 0,
  tannins: 0,
  minsSteeped: 0,
  steep: function (cup) {
      this.caffeine = Math.max(0, this.caffeine - 1);
      if (this.caffeine) {
        cup.caffeine ++;
      }
      cup.tannins += this.tannins * this.minsSteeped;
      cup.color = this.color;
      this.minsSteeped ++;
  }
};

var BlackTea = {
  color: 'Black',
  caffeine: 10,
  tannins: 3,
  hasMilk: false,
  addMilk: function (cup) {
    cup.tannins = Math.floor(cup.tannins / 2);
    this.hasMilk = true;
  }
};

Object.setPrototypeOf(BlackTea, Tea);

var myTea = Object.create(BlackTea);

var myCup = {
    color : "clear",
    caffeine : 0,
    tannins : 0
};

myTea.steep(myCup);
myTea.steep(myCup);
myTea.steep(myCup);

myTea.addMilk(myCup);

console.log(myCup, myTea);
