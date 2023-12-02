// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:5173", // Specify the allowed origin
//     methods: ["GET", "POST"], // Specify the allowed HTTP methods
//   },
// });

// io.on("connection", (socket) => {
//   console.log("new connection", socket.id);
// });

// io.listen(3001);

import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket: Socket) => {
  console.log("New connection", socket.id);

  //listen to connection

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("onlineUsers", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

httpServer.listen(3001, () => {
  console.log("Server is running on port 3001");
});
