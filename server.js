import express from "express";
import "dotenv/config";
import connectDB from "./config/dbConnect.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4068;

const app = express();
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket io");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log(userData?._id);
    socket.emit("connected");
  });

  // connection between 2 users for chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room:" + room);
  });
});
