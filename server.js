import express from "express";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);
const games = [];

app.use(express.static("public"));

sockets.on("connection", (socket) => {
  const playerId = socket.id;
  console.log(`> Player connected: ${playerId}`);

  socket.on("disconnect", () => {
    console.log(`> Player disconnected: ${playerId}`);
  });

  socket.on("joinGmae", ({ playerId, gameKey }) => {
    console.log("joinGmae", { playerId, gameKey });
    for (const game of games) {
      if (game.gameKey == gameKey) {
        game.players.push(playerId);
      }
    }
    emitGame(gameKey);
    console.log(games[gameKey - 1]);
  });

  socket.on("createGame", (playerId) => {
    console.log("createGame", playerId);
    const gameKey = games.length + 1;
    games.push({ host: playerId, players: [playerId], gameKey });
    emitGame(gameKey);
    console.log(games[gameKey - 1]);
  });

  socket.on("findGame", (playerId) => {
    console.log("findGame", playerId);
    let gameKey;
    for (const game of games) {
      if (game.players.length = 1) {
        gameKey = game.gameKey;
      }
    }
    games[gameKey - 1].players.push(playerId);
    emitGame(gameKey);
    console.log(games[gameKey - 1]);
  });

  socket.on("changeGameTag", ({ playerId, gamerTag }) => {
    console.log("changeGameTag", { playerId, gamerTag });
  });

  function emitGame(gameKey) {
    socket.emit("setup", games[gameKey - 1]);
  }
});

server.listen(3000, () => {
  console.log(`> Server listening on port: 3000`);
});
