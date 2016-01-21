module.exports = {
  entry: './index',            // Tell webpack where to start bundling (index.js)
  output: {
    path: __dirname + '/dist', // Tell webpack to output build files to `./dist`
    filename: 'bundle.js'      // Tell webpack to name the output `bundle.js`
  }
};
