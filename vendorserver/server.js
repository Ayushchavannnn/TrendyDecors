require('dotenv').config();
const express = require("express");
const cors = require("cors");
const http = require("http"); // Import the http module
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
// const vendor = require("./router/vendor-route");

const path = require("path");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("/public/index.html"));
});

const PORT = 8080;

const corsOptions = {
  origin: "http://localhost:3002",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use(express.json());
app.use("/api/auth", router);
// app.use("/api/vendor", vendor);

app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));
