const express = require("express")
const { SignupUser, LoginUser } = require("../controllers/user.controller")
const upload = require("../middleware/upload")
const router = express.Router()

router.post("/register", upload.single("img"), SignupUser)
router.post("/login", LoginUser)

module.exports = router