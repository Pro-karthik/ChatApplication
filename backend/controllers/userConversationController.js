const Conversation = require('../models/Conversation');

const userConversationController = async (req, res) => {
  const { receiverPhone } = req.body;
  const senderPhone = req.user.phone; // Extracted from JWT

  try {
    const sortedParticipants = [senderPhone, receiverPhone].sort();
    let conversation = await Conversation.findOne({
      participants: sortedParticipants
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: sortedParticipants
      });
      await conversation.save();
    }

    return res.status(200).json({ 
      success: true, 
      conversationId: conversation._id 
    });

  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

module.exports = userConversationController;