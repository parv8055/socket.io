'use client';

import socket from "@/lib/socket";

export default function Home() {
// console.log(socket);

function send(arg:any) {
  socket.connect();
  socket.emit("chat message", arg, (res:any) => {
    console.log(res); // "got it"
  });
  socket.disconnect();

}
  return (
   <div className="flex flex-col items-center justify-center h-screen">
    hello world
    <button className="p-4 border-white border rounded-md" onClick={()=>{
      console.log("clicked");
      send("hello when connected and disconnected");
    }}>send button</button>
   </div>
  );
}
