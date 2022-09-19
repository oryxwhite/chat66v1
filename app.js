const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

io.on('connection', (socket) => {
    console.log('a user connected  ' + socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


server.listen(3001, () => {
    console.log('Listening on port 3001')
})