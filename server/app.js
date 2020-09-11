const express = require("express");
const http = require("http");
const index = require("./routes/index");
const socketIO = require("socket.io");
const port = process.env.PORT || 4001;

const app = express();
app.use(index);
const server = http.createServer(app);
const serverIO = socketIO(server);

const SERVER_EMIT = "SOCKET EMIT";
const CLIENT_CONNECTION_REQUEST = "CLIENT CONNECTION REQUEST";
const CLIENT_REQUEST = "CLIENT REQUEST";

const serverEmit = (socket, message) => {
  socket.emit(SERVER_EMIT, message);
};

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

serverIO.on("connection", (socket) => {
  socket.on(CLIENT_CONNECTION_REQUEST, (req) => {
    console.log(`Client ${req} requests connection`);
  });

  socket.on(CLIENT_REQUEST, (req) => {
    console.log(req);
    serverEmit(socket, `server recevied client request ${req}`);
  });
});
