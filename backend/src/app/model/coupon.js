const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CouponSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('coupon', CouponSchema)