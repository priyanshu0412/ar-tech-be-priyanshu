const User = require("../models/user.model")
const Jwt = require("jsonwebtoken")

const SignupUser = async (req, res) => {

    const { firstName, lastName, userName, email, password, dob } = req.body
    const { img } = req.file

    try {

        if (!firstName || !lastName || !userName || !email || !password || !dob) {
            res.status(400).send({ message: "Fill All the Data" })
        }
        else {

            const alreadytUser = await User.findOne({ email })
            if (alreadytUser) {
                res.status(400).send({ message: "User is Alredy in the DB" })
            }

            const createNewUser = await User.create({
                firstName,
                lastName,
                userName,
                email,
                password,
                dob,
                img: img ? `/uploads/${req.file.filename}` : undefined,
            })

            const token = Jwt.sign({ userId: createNewUser._id, email: createNewUser.email, userName: createNewUser.userName }, process.env.JWT_SECRET, { expiresIn: "7d" })


            res.status(200).send({ message: "Created User Succesfully", data: token })

        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }

}

const LoginUser = async (req, res) => {
    try {

        const { userNameOrEmail, password } = req.body
        if (!userNameOrEmail || !password) {
            res.status(400).send({ message: 'required all the fields' })
        }

        // find with useranme or email 
        const alreadyUser = await User.findOne({ $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }] })
        if (!alreadyUser) {
            res.status(500).send({ message: 'this email id or username is not present in the DB' })
        }

        if (password === alreadyUser.password) {
            const token = Jwt.sign({ userId: alreadyUser._id, email: alreadyUser.email, userName: alreadyUser.userName }, process.env.JWT_SECRET, { expiresIn: "7d" })

            res.status(200).send({ message: 'Get the data for login User ', data: token })
        }
        else {
            res.status(403).send({ message: "invalid password" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'internal server error' })
    }
}

module.exports = {
    SignupUser,
    LoginUser
}