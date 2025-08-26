const mongoose = require("mongoose")
require("dotenv").config()

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected Successfully")
    }
    catch (error) {
        console.log("Database Connection Failed", error)
    }
}


module.exports = DBConnection