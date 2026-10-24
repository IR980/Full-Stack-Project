const jwt = require("jsonwebtoken")
const blacklistTokenModel = require('../models/blacklist.model')
async function auhtUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "token not provided"
        })
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is Invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({
            message: "token not found"
        })
        
    }

}

module.exports = {auhtUser}