const jwtToken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (user) => {
    return jwtToken.sign({
      id : user._id,
      phone : user.phone
    },process.env.JWT_SECRET)

}

const verifyToken = (token) => {
    try{
        return jwtToken.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return null
    }
    
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password,10)
}

const comparePassword = async (password,hash) => {
    return await bcrypt.compare(password,hash)
}

module.exports = {generateToken,verifyToken,hashPassword,comparePassword}