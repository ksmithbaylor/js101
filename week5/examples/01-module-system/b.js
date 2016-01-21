// Print out that we are executing the `b` module right now
console.log('in B');

// Export an object to whoever requires the `b` module (this file)
module.exports = {
  def: 456
};
