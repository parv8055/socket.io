"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
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
    console.log('a user connected', socket.id);
    // console.log(socket);
    console.log(socket.handshake);
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
    socket.on('chat message', (msg, callback) => {
        console.log('message: ' + msg);
        callback("got it"); //used to send back a response to the client
        io.emit('chat message', msg);
    });
});
httpServer.listen(8080, () => {
    console.log('listening on 8080');
});
