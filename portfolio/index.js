const express=require('express');
const app=express();
const mongoose = require('mongoose');
const cors=require('cors')
const Uploadrouter=require('./Routes/Upload')
const Apirouter=require('./Routes/Api')
const multerconfig  = require('./Controllers/MulterConfig');
const http = require("http"); // Import the http module

const corsconfig={
    origin: '*', // Replace with the allowed origin(s) for your application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Specify the allowed headers
    preflightContinue: false, // Disable preflight requests (OPTIONS)
    optionsSuccessStatus: 204, // Set the status code for successful OPTIONS requests
  };

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
  app.use(cors(corsconfig))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get("/",(req,res,next)=>{
    res.send("hi")
})
app.use('/upload',Uploadrouter)
app.use('/Api',Apirouter)

app.listen('80',()=>{
    console.log("server started ");
})
// server.listen(9000, () => console.log(`Server Started at PORT:9000`));