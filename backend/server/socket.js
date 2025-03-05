const { Server } = require("socket.io");
const Message = require("../models/Message");
const jwt = require("jsonwebtoken");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  const onlineUsers = new Map();

  
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.senderPhone = decoded.phone;

      if (!onlineUsers.has(decoded.phone)) {
        onlineUsers.set(decoded.phone, new Set());
      }
      onlineUsers.get(decoded.phone).add(socket.id);
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.senderPhone, "Socket ID:", socket.id);

    socket.on("joinRoom", async ({ conversationId }) => {
      socket.join(conversationId);
    });

    socket.on('markSeen', async ({conversationId}) => {
      try {
        const updatedMessages = await Message.updateMany({conversationId, status: 'delivered'}, {status: 'seen'})
        if(updatedMessages.modifiedCount > 0){
           console.log(`Marked messages as seen in room ${conversationId}`)
           const messages = await Message.find({conversationId}).limit(1)
           if(messages.length > 0){
              const senderPhone = messages[0].senderPhone
           }
        }
      }
      catch(err){
        console.log(err)
      }
    })

    socket.on("sendMessage", async ({ message, conversationId, receiverPhone }) => {
      try {
        const newMessage = new Message({
          message,
          senderPhone: socket.senderPhone,
          receiverPhone,
          conversationId,
          status: "sent",
        });

        await newMessage.save(); 

        if (onlineUsers.has(receiverPhone)) {
          newMessage.status = "delivered";  
          await newMessage.save()
          onlineUsers.get(socket.senderPhone).forEach((socketId) => {
            io.to(socketId).emit("deliveredMessage", newMessage);
          });
          onlineUsers.get(receiverPhone).forEach((socketId) => {
            io.to(socketId).emit("receiverMessage", newMessage);
          });
        }


        console.log(`Message sent in room ${conversationId}`);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

   
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.senderPhone, "Socket ID:", socket.id);

      if (onlineUsers.has(socket.senderPhone)) {
        onlineUsers.get(socket.senderPhone).delete(socket.id);

        if (onlineUsers.get(socket.senderPhone).size === 0) {
          onlineUsers.delete(socket.senderPhone);
          io.emit("userOffline", socket.senderPhone);
        }
      }

      console.log("Updated online users:", onlineUsers);
    });
  });

  return io;
};

module.exports = initializeSocket;
