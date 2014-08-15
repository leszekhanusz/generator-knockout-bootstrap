var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 9010);
console.log('port = ' + app.get('port'));

if('development' === app.get('env') || 'test' === app.get('env')) {
  app.set('rootFolder', 'app');
  console.log('Adding live-reload middleware');
  //TODO use livereload port defined in Gruntfile.js
  var liveReloadSnippet = require('connect-livereload')();
  app.use(liveReloadSnippet);

  if('development' === app.get('env')) {
    console.log('Running server in development mode');
  }

  if('test' === app.get('env')) {
    console.log('Running server in test mode');
    app.use(express.static(__dirname + '/../test'));
  }
}

if('production' === app.get('env')) {
  console.log('Running server in production mode');
  app.set('rootFolder', 'dist');
  io.enable('browser client minification');   //send minified client
  io.enable('browser client etag');           // apply etag caching logic based on version number
  io.enable('browser client gzip');           // gzip the file
  io.set('log level', 1);                     // reduce logging
}

app.use(express.static(__dirname + '/../' + app.get('rootFolder')));

io.sockets.on('connection', function (socket) {

  socket.on('send_message', function (data) {
    if(data.message) {
      // Sending message to all connected clients
      console.log('send_message ' + data.message);
      io.sockets.emit('message', {message: data.message});
    }
  });

});

server.listen(app.get('port'));
