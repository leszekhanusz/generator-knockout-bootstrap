# <%= appname %>

<%= appdescription %>

## Getting Started

Make sure you have the latest packages installed

```
npm install
bower install
```

Note: If you don't have `npm` installed, make sure you have
[node](http://nodejs.com) installed. If you don't have bower,
`npm install -g bower`.

The above steps will download all the required software to
build and run this app, such as [grunt](http://gruntjs.com),
[requirejs](http://requirejs.org), and [jquery](http://jquery.com).

## Running the server

You can run your app using `grunt serve`. This will start a
server on `http://localhost:9000` and open a browser to this location.

Any modification on the html, css, scss or javascript will be detected
and the page on the browser will be reloaded automatically

If you'd like to run the compiled version (without reloading), run
`grunt serve:dist`.

## Building the application

This application uses requirejs to load the various modules in
the app folder. However, upon build, all of these files are
concatenated and minified together to create a small, compressed
javascript file.

Running `grunt` by itself will run through all of the steps of
linting the javascript, building out dependencies and ultimately
creating all the files in the folder `/dist/`.

## Working with the scaffolded app

There's just enough to in place to get you going. Go ahead
and make your changes to `index.html`. You'll start your
javascript work in `app/assets/js/main.js` by requiring your first
modules. Past that, well, the world is your oyster.

### Tests

TODO

## Deploying your application on a server

Assuming you're already ran `npm install` and `bower install`,
the only pieces required to run the application in its built
state is running `grunt` and copy the files in dist in the 
correct location.
