const { Server } = require("socket.io");
const Message = require("../models/Message");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5172",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], 
  });

  const onlineUsers = new Map()

  io.on('connection',(socket) => {
      
  })

  return io;
};

module.exports = initializeSocket;
