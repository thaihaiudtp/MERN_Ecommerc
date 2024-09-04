const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, default: 'user'},
    telephone: {type: String, default: null},
    passwordChangedAt: {type: String},
    passwordResetToken: {type: String},
    passwordResetExpires: {type: String},
    refreshToken: {type: String}
}, {
    timestamps: true
})

UserSchema.pre('save', async function next() {
    if(!this.isModified('password')){
        next()
    }
    const saltRound = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password ,saltRound)
})

module.exports = mongoose.model('user', UserSchema)