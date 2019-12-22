const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    io.emit('chat message', 'user disconnected');
  });
});


const index = require('./routes/index');

app.use('/', index);
const codewars = require('./routes/code-wars');

app.use('/', codewars);


http.listen(3000, () => {
  console.log('listening on *:3000');
});