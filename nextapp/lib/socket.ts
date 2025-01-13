import { io } from "socket.io-client";

const URL = "http://localhost:8080";
const socket = io(URL,{
    transports: ["websocket"],
    path: "/websocket/socket.io/",
    auth: {
        userId: 'parv choudhary',
        token: 'qwerty12345678',
      },
      // autoConnect: false
});

export default socket;