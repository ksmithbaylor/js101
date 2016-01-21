# Webpack Config

Instead of manually specifying all the arguments every time you run `webpack`,
you can define a config file for webpack so it knows how to build your project.
The default place it looks is a file called `webpack.config.js`.

The config included here is pretty simple. It just tells `webpack` where the
entry point is, and where to write the output to. Notice that instead of
outputting to a file called `bundle.js` in the same directory, I'm putting the
bundle in a directory called `dist`. This is a pretty common setup.

`index.html` is loading my bundle from `dist/bundle.js`. You can open it up in
the browser and see the fading text, same as before.

# Instructions

Again, you need to install your dependencies. I've specified that this project
depends on the `jquery` module in the `package.json` file. To install:

    $ npm install

Then, to build the project, just run:

    $ webpack

Webpack will pick up the config from `webpack.config.js` and build your project.
This means you don't have to run `webpack index.js dist/bundle.js`. Obviously
this wouldn't be to hard for this project, but as your project gets more
complicated it's a huge benefit to just be able to come in and run `webpack`.

Open `index.html` in the browser like before to see the results.
