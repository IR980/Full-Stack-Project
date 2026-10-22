const userModel = require('../models/user.model')

/*  @name - userController 
   @description 
*/

async function userRegister(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
      return res.status(400).json({
         message: "unauthorized"
      })
    }

   //  check email is exists or not
   const isUserExists = await userModel.findOne({
      $or: [{username}, {email}]
   })

   if(isUserExists){
      return res.status(400).json({
         message: "username and email already exists"
      })
   }
}
module.exports = {userRegister}
