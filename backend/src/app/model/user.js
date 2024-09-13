const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const CryptoJs = require('crypto-js')
const softDelete = require('mongoose-delete')
const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, default: 'user'},
    telephone: {type: String, default: null},
    address: {
        type: Array,
        default: []
    },
    passwordChangedAt: {type: Date},
    passwordResetToken: {type: String},
    passwordResetExpires: {type: String},
    refreshToken: {type: String}
}, {
    timestamps: true
})
UserSchema.plugin(softDelete, {deletedAt: true})
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    const saltRound = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password ,saltRound)
    next()
})

UserSchema.methods.resetPassword = function(){
    console.log('ok')
    const resetToken = CryptoJs.lib.WordArray.random(32).toString(CryptoJs.enc.Hex)
    this.passwordResetToken = CryptoJs.SHA256(resetToken).toString(CryptoJs.enc.Hex)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('user', UserSchema)