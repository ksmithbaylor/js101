var Tea = function(options) {
    this.color = options.color || "herbal";
    this.caffeine = options.caffeine || 0;
    this.tannins = options.tannins || 0;
    this.minsSteeped = 0;
}

Tea.prototype = {
  steep : function(cup) {
      this.caffeine = Math.max(0, this.caffeine - 1);
      if (this.caffeine) {
        cup.caffeine ++;
      }
      cup.tannins += this.tannins * this.minsSteeped;
      cup.color = this.color;
      this.minsSteeped ++;
  }
};

var BlackTea = function(){
    Tea.call(this, {
        color : "Black",
        caffeine : 10,
        tannins : 3
    });
    this.hasMilk = false;
}

BlackTea.prototype = Object.create(Tea.prototype);

BlackTea.prototype.addMilk = function(cup) {
    cup.tannins = Math.floor(cup.tannins / 2);
    this.hasMilk = true;
}

var myTea = new BlackTea();

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
