const express = require('express')
const route = express.Router()
const verifyToken = require('../app/middleware/verifyToken')
const couponController = require('../app/controller/couponController')
route.post('/create', verifyToken.verifyTokenAdmin, couponController.create)
route.put('/update/:coid', verifyToken.verifyTokenAdmin, couponController.update)
route.delete('/:coid', verifyToken.verifyTokenAdmin, couponController.delete)
route.get('/', couponController.getCoupons)
module.exports = route