express = require('express')
socketio = require('socket.io')

app = express.createServer()
app.use express.static 'app'
io = socketio.listen app
io.set 'log level', 1
io.sockets.on 'connection', (socket) ->
    socket.on 'patch', (data) ->
        socket.broadcast.emit 'patch', data
app.listen 5000
