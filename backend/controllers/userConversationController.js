const Conversation = require('../models/Conversation')

const userConversationController = async (req,res) => {
  const details = req.body
  const receiverPhone = details.receiverPhone
  const senderPhone = req.user.phone
  try{
    let conversation = await Conversation.findOne({
      participants : {$all : [senderPhone,receiverPhone]}
    })
  
    if(!conversation){
      conversation = new Conversation({
        participants : [senderPhone,receiverPhone]
      })
      await newConversation.save()
    }
    res.status(200).json({ success: true, conversation });
  }
  catch(err){
    res.status(500).json({ success: false, message: err.message });
  }

}

module.exports = userConversationController