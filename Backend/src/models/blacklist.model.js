const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required for add to the blacklist"]
    }
}, {
    timestamps: true
})

const blacklistTokenModel = mongoose.model("blaclist", blacklistTokenSchema)
module.exports = blacklistTokenModel