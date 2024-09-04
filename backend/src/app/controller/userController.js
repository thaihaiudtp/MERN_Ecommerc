const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {genAccessToken, genRefreshToken} = require('../middleware/jwt')
class UserController {
    //ĐĂNG KÝ [POST] /user/register
    async userRegister(req, res){
        try {
            const {email, password, name, telephone} = req.body
            if(!email || !password || !name) 
                return res.status(400).json({message: 'Please fill in all fields'})
            const isExist = await User.findOne({ email})
            if(isExist) throw new Error("Email exist")
            const newUser = await User.create(req.body)
            return res.status(200).json({
                success: newUser ? true : false,
                message: newUser ? "User created successfully" : "Failed to create user",
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    }
    // ĐĂNG NHẬP [POST]  /user/login
    async userLogin(req, res, next){
        try {
            const email = req.body.email
            const isUser = await User.findOne({email})
            if(!isUser){
                res.send('user not found')
            } else {
                const isPassword = await bcrypt.compare(req.body.password, isUser.password)
                if(isPassword){
                    const AccessToken = genAccessToken(isUser._id, isUser.role)
                    const RefreshToken = genRefreshToken(isUser._id)
                    await User.findByIdAndUpdate(isUser._id, {refreshToken: RefreshToken}, {new: true})
                    res.cookie('refreshToken', RefreshToken, {httpOnly: true, maxAge: 10*24*60*60*1000})
                    res.json({isUser, AccessToken})
                } else {
                    res.send('password is incorrect')
                }
            }
        } catch (error) {
            res.status(404).json({error: 'ERROR!!!'})
            console.log(error)
        }
    }
}
module.exports = new UserController