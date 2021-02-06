require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT;

const { Player } = require("./player");
const players = [];

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected.`);

  let newPlayer = new Player(0, 0, socket.id);
  players.push(newPlayer);

  socket.on("disconnect", () => {
    players.splice(getPlayerIndexByID(socket.id), 1);

    console.log(`Client ${socket.id} disconnected.`);
  });

  socket.on("chose-name", (name) => {
    players[getPlayerIndexByID(socket.id)].nickname = name;
  });

  socket.on("player-update", (data) => {
    let index = getPlayerIndexByID(data.id);

    try {
      players[index].x = data.x;
      players[index].y = data.y;
    } catch (error) {
      return;
    }

    io.emit("player-update", players);
  });

  socket.on("chat-message", (msg) => {
    socket.broadcast.emit("chat-message", {
      sender: getPlayerByID(socket.id).nickname,
      message: msg,
    });
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

function getPlayerIndexByID(id) {
  for (let player of players) {
    if (player.id === id) {
      return players.indexOf(player);
    }
  }

  return -1;
}

function getPlayerByID(id) {
  let index = getPlayerIndexByID(id);
  if (index === -1) return null;

  return players[index];
}
