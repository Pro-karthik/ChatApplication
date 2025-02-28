const userModel = require('../models/User')

const userGetProfileController = async (req, res) => {
    const user = req.user
    try{
        const userDetails = await userModel.findById(user.id)
        if(userDetails === null){
          return res.status(404).json({message : 'User not found'})
        }
        const details = {
          name: userDetails.name,
          phone: userDetails.phone,
          profilePicture: userDetails.profilePicture, 
          about: userDetails.about, 
        };
    
        return res.json(details);
    }
    catch(err){
      console.log(err)
      res.status(500).json({message:err.message})
    }
    res.json(user)
}

module.exports = userGetProfileController