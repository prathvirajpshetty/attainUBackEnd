const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const connectDB = require("./config/db.js");
const path = require("path");
const morgan = require("morgan");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

connectDB();

const port = process.env.PORT || 7000;

const productsRouter = require("./routes/products.js");
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");

app.use("/media", express.static(path.join(__dirname, "storage", "media")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get(" * ", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "frontend")));
}

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

let ioStorage = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.data.userId = socket.handshake?.auth?.userId;
  socket.data.userRole = socket.handshake?.auth?.userRole;

  ioStorage[socket.data.userId] = { socketId: socket.id };

  if (
    socket.data.userRole === "admin" ||
    socket.data.userRole === "moderator"
  ) {
    console.log("admin join room");
    socket.join("admins-room");
  }

  socket.on("disconnect", (socket) => {
    console.log("user disconnected"); 
  });
});

http.listen(port, () => {
  console.log(`server is listening from port ${port}`);
});

module.exports.io = io;
module.exports.ioStorage = ioStorage;
