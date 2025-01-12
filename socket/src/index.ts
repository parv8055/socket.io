import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
      origin: "http://localhost:3000"
    },
    path: "/websocket/socket.io/"
  });

app.get('/', (req, res) => {
    res.send('connected');
});

io.on('connection', (socket) => {
    // const count = io.engine.clientsCount;
    //tells the number of conected clients
    // console.log(count);
    console.log('a user connected',socket.id);
    // console.log(socket);
    console.log(socket.handshake)
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
    });

    socket.on('chat message', (msg,callback) => {
        console.log('message: ' + msg);
        callback("got it"); //used to send back a response to the client
        io.emit('chat message', msg);
    });
});

httpServer.listen(8080, () => {
    console.log('listening on 8080');
});