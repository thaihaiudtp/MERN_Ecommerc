const express = require('express')
const productController = require('../app/controller/productController')
const verifyToken = require('../app/middleware/verifyToken')
const route = express.Router()

route.post('/create', verifyToken.verifyTokenAdmin, productController.create)
route.get('/getall', productController.getall)
module.exports = route