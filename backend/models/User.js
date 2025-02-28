const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  },
  friends: {
    type: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true, trim: true },
        _id : {type:String,required :true}
      },
    ],
    default: [],
  },
  profilePicture: {
    type: String, 
    default: "https://claritycareconsulting.co.uk/wp-content/uploads/2023/05/Blank-Profile-Picture.jpg",
  },
  about: {
    type: String,
    default: "Hey there! I am using this chat app.",
    trim: true,
  },
}, { timestamps: true });

const userModel = mongoose.model('User',userSchema)

module.exports =  userModel
