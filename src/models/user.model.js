const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenth: 8
    },
    dob: {
        type: Date,
    },
    img: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

const User = mongoose.model("User", userSchema)
module.exports = User