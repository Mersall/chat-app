const express = require("express");
const app = express();
const socketIO = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = express()
  .use(app)
  .listen("8080", () => console.log(`Listening Socket on 8080`));

const io = socketIO(server);

io.on("connection", async (socket) => {
  socket.on("chat_message", (msg) => {
    socket.emit("chat_message", msg);
    socket.broadcast.emit("chat_message", msg);
  });
});
