const userModel = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistTokenModel = require('../models/blacklist.model')
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

   const hash = await bcrypt.hash(password, 10)

   const user = await userModel.create({
      username,
      email,
      password: hash
   })

   const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "3d"})

   res.cookie("token", token)
   res.status(201).json({
      message: "User Registered Succesfull",
      user: {
         id: user._id,
         username: user.username,
         email: user.email
      }
   })
}

// login controller
async function userLogin(req, res) {
   const {email, password} = req.body

   const user = await userModel.findOne({email})
   if(!user){
      return res.status(400).json({
         message: "Invalid email and password"
      })
   }

   const isPasswordValid = await bcrypt.compare(password, user.password)
   if(!isPasswordValid){
      return res.status(400).json({
         message: "password is Incorrect please enter the correct password"
      })
   }

   const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "3d"})
   res.cookie("token", token)
   res.status(200).json({
      message: "User Logged in Successfull",
      user: {
         id: user._id,
         username: user.username,
         email: user.email
      }
   })
}
// logout user
async function userLogout(req, res) {
   const token = req.cookies.token

   if(token){
      await blacklistTokenModel.create({
         token
      })
   }
   res.clearCookie("token")
   res.status(200).json({
      message: "user logout sucessfully"
   })
}

async function getMe(req, res) {
   const user = await userModel.findById(req.user.id)
   res.status(200).json({
      message: "user Datails fetch Successfuly",
      user:{
         id: user._id,
         username: user.username,
         email: user.email
      }
   })
}

module.exports = {userRegister, userLogin, userLogout, getMe}
