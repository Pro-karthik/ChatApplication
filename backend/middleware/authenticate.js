const {verifyToken} = require('../utils/jwtMethods')

const authenticate = (req, res, next) => {
 try{
     const authHeader = req.get('authorization')?.split(' ')[1]
     if(!authHeader){
         return res.status(401).json({message : 'Authentication failed'})
     }
     const user = verifyToken(authHeader)
     if(user === null){
          return res.status(401).json({message : 'Invalid token'})
     }
     req.user = user
     next()

 }
 catch(err){
  console.log(err)
    return res.status(401).json({message : err})
  }
}

module.exports = authenticate