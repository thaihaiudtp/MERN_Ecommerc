const Coupon = require('../model/coupon')
class CouponController {
    async create(req, res){
        const {name, discount, expiry} = req.body
        if(!name || !discount || !expiry) throw new Error("missing input")
        const newCoupon = await Coupon.create({
            ...req.body,
            expiry: Date.now() + expiry*24*60*60*1000
    })
        res.status(200).json({
            message: newCoupon? "Coupon created successfully":"Unsuccess",
            data: newCoupon
        })
    }
    async getCoupons(req, res){
        const coupons = await Coupon.find().select('-createdAt -updatedAt').sort('discount')
        res.status(200).json({
            message: "Coupons fetched successfully",
            data: coupons
        })
    }
    async update(req, res){
        const {coid} = req.params
        if(Object.keys(req.body).length === 0) throw new Error("missing input")
        if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry*24*60*60*1000
        const update = await Coupon.findByIdAndUpdate(coid, req.body, {new: true}).select('-createdAt -updatedAt')
        res.status(200).json({
            message: update? "Coupon updated successfully":"Unsuccess",
            data: update
        })
    }
    async delete(req, res){
        const {coid} = req.params
        await Coupon.findByIdAndDelete(coid)
        res.status(200).json({
            message: "Delete successful"
        })
    }
}
module.exports = new CouponController