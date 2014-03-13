var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function() {
  app.set('port', process.env.PORT || 9010);
  console.log('port = ' + app.get('port'));
});

if('development' === app.get('env') || 'test' === app.get('env')) {
  app.set('rootFolder', '<%= env.options.appPath %>');
  console.log('Adding live-reload middleware');
  //TODO use livereload port defined in Gruntfile.js
  var liveReloadSnippet = require('connect-livereload')();
  app.use(liveReloadSnippet);
}

app.configure('development', function() {
  console.log('Running server in development mode');
});

app.configure('test', function() {
  console.log('Running server in test mode');
  app.use(express.static(__dirname + '/../test'));
});

app.configure('production', function() {
  console.log('Running server in production mode');
  app.set('rootFolder', 'dist');
  io.enable('browser client minification');   //send minified client
  io.enable('browser client etag');           // apply etag caching logic based on version number
  io.enable('browser client gzip');           // gzip the file
  io.set('log level', 1);                     // reduce logging
});

app.use(express.static(__dirname + '/../' + app.get('rootFolder')));

io.sockets.on('connection', function (socket) {

  socket.on('ping', function () {
    socket.emit('pong');
  });

});

server.listen(app.get('port'));
