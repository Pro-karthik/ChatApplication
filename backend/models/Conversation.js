const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [String],
      required: true,
    },
    lastMessage: {
      message: String,
      senderPhone: String,
      timestamp: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
