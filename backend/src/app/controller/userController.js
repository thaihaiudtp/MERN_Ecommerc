const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CryptoJs = require('crypto-js')
const {genAccessToken, genRefreshToken} = require('../middleware/jwt')
const sendMail = require('../ultil/sendMail')
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
                message: "tài khoản tồn tại"
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
    async getOne(req, res) {
        const {_id} = req.user
        const user = await User.findById(_id).select('-password -role -refreshtoken')
        return res.status(200).json({
            success: user ? true : false,
            result: user
        })
    }
    async resetAccessToken(req, res){ //Lấy refresh từ cookie, so sánh với refreshToken đươc lưu ở db
        const cookie = req.cookies
        if(!cookie || !cookie.refreshToken){
            return res.status(403).json({message: "refresh token is missing!"})
        } else {
            const result = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
            const response = await User.findOne({_id: result._id}, {refreshToken: cookie.refreshToken})
            if(!response){
                return res.status(403).json({message: "refresh token is invalid!"})
            } else {
                const newAccessToken = await genAccessToken(result._id, result.role)
                return res.status(200).json({
                    message: "access token is generated successfully",
                    newAccessToken
                })
            }
        }
    }
    async logout(req, res) { //Lấy refresh từ cookie sau đó xóa trong db và cookie
        const cookie = req.cookies
        if(!cookie || !cookie.refreshToken){
            return res.status(403).json({message: "refresh token is missing!"})
        } else {
            await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ""}, {new: true})
            res.clearCookie('refreshToken', {httpOnly: true, security: true})
            return res.status(200).json({
                message: "logout successfully"
            })
        }
    }
    async forgetPassword(req, res){
        const {email} = req.query
        if(!email){
            return res.status(400).json({message: "email is missing!"})
        } else {
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({message: "user not found!"})
            } else {
                const resetToken = user.resetPassword()
                await user.save()
                const html = `Click vào link để đổi mật khẩu. Link sẽ hết hạn sau 10 phút. <a href=${process.env.URL_SERVER}/user/resetpass/${resetToken}>Click</a>`
                const data = {
                    email, html
                }
                const rs = await sendMail(data)
                return res.status(200).json({
                    rs
                })
            }
        }
    }
    async changePassword(req, res){
      
        const {password, resetToken} = req.body
        const passwordResetToken = CryptoJs.SHA256(resetToken).toString(CryptoJs.enc.Hex)
        const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}})
        if(!user){
            throw new Error("error");
        } else {
            user.passwordResetToken = undefined
            
            user.passwordChangedAt= Date.now()
            user.password = password
            user.passwordResetExpires = undefined
            await user.save()
            return res.status(200).json({
                success: user ? true:false,
                message: "change password successfully"
            })
        }
    }
    async getAllUser(req, res){
        const users = await User.find({role: "user", deleted: false}).select("-password -deleted")
        return res.status(200).json({
            success: users ? true : false,
            rs: users
        })
    }
    async getAllUserDeleted(req, res){
        const users = await User.find({deleted: true}).select("-password")
        return res.status(200).json({
            success: users ? true : false,
            rs: users
        })
    }
    async updateUser(req, res){
        const {_id} = req.user
        if(!_id || Object.keys(req.body).length === 0){
            return res.status(400).json({message: "invalid request!"})
        } else {
            const users = await User.findByIdAndUpdate(_id, req.body, {new: true}).select("-password -role -refreshToken")
            return res.status(200).json({
                success: users ? true : false,
                rs: users
            })
        }
    }
    async softDelete(req, res){
        const {_id} = req.user
        if(!_id){
            return res.status(400).json({message: "invalid request!"})
        } else {
            const userDelete = await User.delete({_id: _id})
            return res.status(200).json({
                success: userDelete ? true : false,
                message: "Thành công!!!"
            })
        }
    }
    async updateUserAddress(req, res){
        const {_id} = req.user
        if(!req.body.address) throw new Error("missing input")
        const update = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, {new: true})
        return res.status(200).json({
            success: update ? true : false,
            rs: update
        })
    }
    async updateUserCart(req, res){
        const {_id} = req.user
        const {pid, quantity, color} = req.body
        if(!pid || !quantity ||!color) throw new Error("missing input")
        try {
            const user = await User.findById(_id).select('cart')
            const alreadyCart = user?.cart?.find(el => el.product.toString() === pid && el.color===color)
            if(alreadyCart){
                alreadyCart.quantity += Number(quantity)
            } else {
                user.cart.push({product: pid, quantity: quantity, color: color})
            }
            const updateCart = await user.save()
            return res.status(200).json({
                success: updateCart ? true : false,
                rs: updateCart
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}
module.exports = new UserController