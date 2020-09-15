import express from "express";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static("public"));

sockets.on("connection", (socket) => {
  const playerId = socket.id;
  console.log(`> Player connected: ${playerId}`);

  socket.on("disconnect", () => {
    console.log(`> Player disconnected: ${playerId}`);
  });
  socket.on("a",(a) =>{
    console.log(a);
  })
});

server.listen(3000, () => {
  console.log(`> Server listening on port: 3000`);
});
