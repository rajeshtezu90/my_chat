import express from "express";
import http from "http";
import path from "path";
import socketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get("/", (request, response) => {
  response.sendFile(path.resolve("public/index.html"));
});

const namespace = io.of("/my-namespace"); // This is a way we can create a separate namespace for each user

namespace.on("connection", function(socket) {
  console.log("A user connected.");

  socket.on("chat message", function(message) {
    console.log("Message from client: ", message);

    namespace.emit("chat message", message);
  });

  socket.on("disconnect", function() {
    console.log("User disconnected.");
  });
});

server.listen(3000, function() {
  console.log("Listening on *:3000");
});
