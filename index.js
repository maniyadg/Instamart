const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const db = require('./backend/db/connection')
const errorMiddleware = require('./backend/middlewares/error')
require('dotenv').config();

// Routes
const authroute = require("./backend/routes/userRoutes")
const categoryroute = require('./backend/routes/categoryRoutes')
const productRoute = require('./backend/routes/postRoutes')
const cartRoute = require('./backend/routes/cartRoutes')
const shippingRoute = require('./backend/routes/shippingRoutes')
const paymentRoute = require('./backend/routes/paymentRoutes')
const chatRoutes = require('./backend/routes/chatRoutes')
const messageRoutes = require("./backend/routes/messageRoutes");
const orderRoutes = require('./backend/routes/orderRoutes')
const commentRoutes = require('./backend/routes/commentRoutes')

const app = express()
const socket = require("socket.io")

app.use(cookieParser());
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}));// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

// db connection
db()

app.get('/' , (req,res) => {
    res.send('<h1>welcome to InstaMart server</h1>')
})

app.use('/api' , authroute )
app.use('/api' , categoryroute)
app.use('/api' , productRoute)
app.use('/api' , cartRoute)
app.use('/api' , shippingRoute)
app.use('/api/payment' , paymentRoute)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)
app.use("/api" , orderRoutes)
app.use('/api' , commentRoutes)

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.use(errorMiddleware)

const PORT =process.env.PORT || 4005

const server = app.listen(PORT, () => {
    console.log(
      `Server Running on port ${PORT}`
    );
  });


  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });