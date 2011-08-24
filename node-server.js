(function() {
  var app, express, io, socketio;
  express = require('express');
  socketio = require('socket.io');
  app = express.createServer();
  app.use(express.static('app'));
  io = socketio.listen(app);
  io.set('log level', 1);
  io.sockets.on('connection', function(socket) {
    return socket.on('patch', function(data) {
      return socket.broadcast.emit('patch', data);
    });
  });
  app.listen(5000);
}).call(this);
