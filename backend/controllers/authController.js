const {generateToken,hashPassword,comparePassword} = require('../utils/jwtMethods')
const userModel = require('../models/User')

const loginUser = async (req,res) => {
  const {phone,password} = req.body

  
  try{
    const user = await userModel.findOne({phone})
   
    if(user === null){
      return res.status(400).json({error : 'Invalid credentials'})
    }

    const isMatch = await comparePassword(password,user.password)
    if(!isMatch){
      return res.status(400).json({error : 'Invalid password'})
    }
    const token = generateToken(user)
    return res.status(200).json({jwt_token : token})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({error : 'Internal server error'})
  }
}

const registerUser = async (req,res) => {
  const {name,phone,password} = req.body
  try{
    const hashedPassword = await hashPassword(password)
    const isUserAlreadyExists = await userModel.findOne({phone})
    if(isUserAlreadyExists !== null){
      return res.status(400).json({error : 'User already exists'})
    }
    const user = await userModel.create({
      name,phone,password : hashedPassword
    })

    const token = generateToken(user)
    return res.status(200).json({jwt_token : token})
}
catch(err){
  return res.status(500).json({error : 'Internal server error'})
}
}
module.exports = {loginUser,registerUser}