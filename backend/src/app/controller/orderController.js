const Order = require('../model/order')
const User = require('../model/user')
const Coupon = require('../model/coupon')
class OrderController{
    async createOrder(req, res){
        const {_id} = req.user
        //const {coupon} = req.body
        const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
        if(userCart.cart.length===0){
            return res.status(400).json({message: 'Cart is empty'})
        }
        const products = userCart?.cart?.map(el => ({
            product: el.product._id,
            count: el.quantity,
            color: el.color
        }))
        let total = userCart?.cart?.reduce((sum, el) => el.product.price*el.quantity + sum, 0)
        const createData={products, total, orderBy: _id}
        //if(coupon){
        //    const couponData = await Coupon.findById(coupon)
        //    total = Math.round(total * (1- +couponData.discount/100)/1000)*1000
        //    createData.total = total
        //    createData.coupon = coupon
        //}
        const rs = await Order.create(createData)
        return res.status(200).json({
            message: 'Order created successfully',
            rs: rs
        })
    }
    async updateStatus(req, res){
        const {oid} = req.params
        const {status} = req.body
        if(!status) return res.status(200).json({
            message: 'Status is required',
        })
        const update = await Order.findByIdAndUpdate(oid, {status: status}, {new: true})
        return res.status(200).json({
            message: 'Status updated successfully',
            update
        })
    }
    async cancelCoupon(req, res){
        const {oid} = req.params
        const order = await Order.findById(oid).populate('products.product', 'price')
        const total = order.products.reduce((sum, el)=>{
            return sum+el.product.price*el.count
        }, 0)
        const cancelCoupon = await Order.findByIdAndUpdate(oid, {$unset: {coupon: ""}, total: total}, {new: true})
        return res.status(200).json({
            message: 'Coupon cancelled successfully',
            cancelCoupon
        })
    }
    async addCoupopn(req, res){
        const {oid} = req.params
        const {coupon} = req.body
        const order = await Order.findById(oid).populate('products.product', 'price')
        let total = order.products.reduce((sum, el)=>{
            return sum+el.product.price*el.count
        }, 0)
        if(coupon){
            const couponData = await Coupon.findById(coupon)
            total = Math.round(total * (1- +couponData.discount/100)/1000)*1000
        } 
        const addCoupon = await Order.findByIdAndUpdate(oid, {$set: {coupon: coupon, total: total}}, {new: true})
        return res.status(200).json({
            message: 'Coupon cancelled successfully',
            addCoupon
        })
    }
    async getOrders(req, res){
        const orders = await Order.find()
        return res.status(200).json({
            message: 'Orders retrieved successfully',
            orders
        })
    }
    async getUserOrder(req, res){
        const {uid} = req.params
        const orders = await Order.find({orderBy: uid})
        return res.status(200).json({
            message: 'Orders retrieved successfully',
            orders
        })
    }
}
module.exports = new OrderController