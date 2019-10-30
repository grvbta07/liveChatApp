const express = require("express");
const socket = require("socket.io");

//App setup
const app = express();
var port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("listening to the port 3000");
});

// static files,if user goes to localhost/ or localhost/index.html
// server know to go this public static files
app.use(express.static("public"));

//socket setup
//socket io to work on above server i.e first parameter
const io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection", socket.id);
  //msg received from frond end on chat event
  socket.on("chat", data => {
    //io.sockets represents all the socket connection to this server
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    //brodcast emit all sockets except for itself
    socket.broadcast.emit("typing", data);
  });
});
