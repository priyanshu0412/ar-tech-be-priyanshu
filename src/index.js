const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const DBConnection = require("./db")
const userRoutes = require("./routes/user.routes")
require("dotenv").config()
const morgan = require('morgan')
const cors = require("cors")

// Parsing Data 
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("/src/uploads"))
app.use(morgan('dev'))

// DB Connection 
DBConnection()

app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("server started")
})