const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const bookMarkRoutes = require("./routes/bookmark");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/message");

// it will load the .env file and add the values to the process.env object that we can access in our application.
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();
// process.env.MY_SECRET will be available in our application
mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Could not connect to MongoDB..."));
app.use(express.json());
app.use("/api", authRoutes); //localhost:3000/api/
app.use("/api/users", userRoutes); //localhost:3000/api/user/id
app.use("/api/jobs", jobRoutes); //localhost:3000/api/jobs/id
app.use("/api/bookmarks", bookMarkRoutes); //localhost:3000/api/bookmarks
app.use("/api/chats", chatRoute); //localhost:3000/api/chats
app.use("/api/messages", messageRoute); //localhost:3000/api/messages
app.get("/", (req, res) => res.send("Hello World!"));

const server = app.listen(process.env.PORT || 3000, "0.0.0.0", () =>
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    //for the local development
    //origin: 'http://localhost:3000',
    //for the production
    origin: "https://job-sathi-backend.vercel.app",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("setup", (userId) => {
    // join the user to the room with the userId
    socket.join(userId);
    // emit help to the client side to get the online users list
    socket.broadcast.emit("online-user", userId);
    console.log(userId);
  });
  // listen to the message event and emit the message to the client side
  socket.on("typing", (room) => {
    console.log("typing");
    console.log("room");
    socket.to(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => {
    console.log("stop typing");
    console.log("room");
    socket.to(room).emit("stop typing", room);
  });
  socket.on("joinchat", (room) => {
    console.log("joinchat");
    socket.join(room);
  });
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    var room = chat._id;
    var sender = newMessageReceived.sender;
    if (!sender || !sender._id) {
      console.log("sender not found");
      return;
    }
    var senderId = sender._id;
    console.log(senderId + "message sender");
    const users = chat.users;
    if (!users) {
      console.log("user not found");
      return;
    }
    socket.to(room).emit("message received", newMessageReceived);
    socket.to(room).emit("message sent", "New Message");
  });
  socket.off("setup", () => {
    console.log("user offline");
    socket.leave(userId);
  });
});
