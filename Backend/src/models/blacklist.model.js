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
<<<<<<< HEAD
module.exports = blacklistTokenModel
=======
module.exports = blacklistTokenModel
>>>>>>> d429da47a0e4f873420f30016f945fcac69cb4ce
