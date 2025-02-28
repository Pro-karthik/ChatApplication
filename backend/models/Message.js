const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId : {
    type : mongoose.Schema.Types.ObjectId,
    ref :"Conversation",
    required : true
  },
  senderPhone :{
    type:String,
    required :true
  },
  receiverPhone : {
    type : String,
    required : true
  },
  message : {
    type: String,
    required : true
  },
  timestamp : {
    type : Date,
    default : Date.now
  },
  status : {
    type : String,
    enum : ["sent","delivered","seen"],
    default:"sent"
  }

},{
  timestamps : true
})

module.exports = mongoose.model("Message", messageSchema);
