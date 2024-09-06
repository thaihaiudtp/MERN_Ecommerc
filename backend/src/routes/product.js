const express = require('express')
const productController = require('../app/controller/productController')
const verifyToken = require('../app/middleware/verifyToken')
const route = express.Router()

route.post('/create', verifyToken.verifyTokenAdmin, productController.create)
route.get('/getall', productController.getall)
route.get('/getdeleted',verifyToken.verifyTokenAdmin, productController.getdeleted)
route.put('/update/:pid', verifyToken.verifyTokenAdmin, productController.update)
route.delete('/delete/:pid', verifyToken.verifyTokenAdmin, productController.delete)
module.exports = route