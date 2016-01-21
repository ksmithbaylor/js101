# Webpack Basics

This introduces how you can `require` modules from npm and use them in the
browser.

# Instructions

First install `webpack` globally:

    $ npm install -g webpack

You'll also need to grab the `jquery` module from npm so you can use it from
this project:

    $ npm install jquery

Then, to build your bundle:

    $ webpack index.js bundle.js

If you want to also minify the output:

    $ webpack -p index.js bundle.js

If you want to watch `index.js` for changes and have webpack re-build the bundle
every time you change the file:

    $ webpack -w index.js bundle.js

(You can combine the `-w` and `-p` options if you want.)

Notice that `index.html` loads the `bundle.js` file. If it tried to load
`index.js` instead, it wouldn't work! The browser doesn't know what `require`
means.

Open `index.html` in the browser to see your awesome text fading in and out.
