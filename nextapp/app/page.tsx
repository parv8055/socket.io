'use client';

import socket from "@/lib/socket";

export default function Home() {
  socket.on("hello", (res) => {
    alert(res);
  });

function send(arg:any) {
  // socket.connect();
  socket.emit("chat message", arg, (res:any) => {
    console.log(res); // "Got the message"
    socket.on("chat message", (res) => {
      alert(res);
    });
  });
  // socket.disconnect();
}
  return (
   <div className="flex flex-col items-center justify-center h-screen">
    hello world
    <button className="p-4 border-white border rounded-md" onClick={()=>{
      console.log("clicked");
      send("hello from CLIENT");
    }}>send button</button>
   </div>
  );
}
