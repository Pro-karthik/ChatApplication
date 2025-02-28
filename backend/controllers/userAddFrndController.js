const userModel = require('../models/User')  

const userAddFrndController = async (req, res) => {
  const {phone,name} = req.body
  const {id} = req.user
  try{
    const user = await userModel.findById(id)
    if(!user){
      return res.status(404).json({message : 'User not found'})
    }
    const friend = await userModel.findOne({phone})
    if(!friend){
      return res.status(404).json({message : 'Friend not found'})
    }
    if(user.friends.some(frnd => frnd.phone === phone)){
      return res.status(400).json({message : 'Friend already added'})
    }
    user.friends.push({phone,name,_id : friend._id})
    user.save()
    return res.status(200).json({message : 'Friend added successfully'})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message : 'Internal server error'})
  }
 
  
}

module.exports = userAddFrndController