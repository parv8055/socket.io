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
    //tells the number of conected clients
    // const count = io.engine.clientsCount;
    // console.log(count);


    console.log(`User_connected ${socket.id}`);

    //disconncted event
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
    });

    //chat message event
    socket.on('chat message', (msg,callback) => {
        console.log('message: ' + msg);
        callback("Got the message"); //used to send back a response to the client
        io.emit('chat message', msg);
    });


    
});

httpServer.listen(8080, () => {
    console.log('listening on 8080');
});