const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username is already taken"],
        required: true
    },

    email: {
        type: String,
        unique: [true, "this email address is already exists"],
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("user",userSchema)
module.exports = userModel