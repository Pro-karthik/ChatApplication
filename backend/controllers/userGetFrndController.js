const userModel = require('../models/User')

const userGetFrndController = async (req, res) => {
    const {id} = req.user
    try{
       const user = await userModel.findById(id)
        if(!user){
          return res.status(404).json({message : 'User not found'})
        }
        return res.status(200).json({friends : user.friends})
    }
    catch(err){
      return res.status(500).json({message : 'Internal server error'})
    }
}

module.exports =  userGetFrndController