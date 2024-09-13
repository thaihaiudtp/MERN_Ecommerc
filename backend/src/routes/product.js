const express = require('express')
const productController = require('../app/controller/productController')
const verifyToken = require('../app/middleware/verifyToken')
const uploader = require('../config/cloudinary.config')
const route = express.Router()

route.post('/create', verifyToken.verifyTokenAdmin, productController.create)
route.get('/getall', productController.getall)
route.get('/getdeleted',verifyToken.verifyTokenAdmin, productController.getdeleted)
route.put('/update/:pid', verifyToken.verifyTokenAdmin, productController.update)
route.delete('/delete/:pid', verifyToken.verifyTokenAdmin, productController.delete)
route.put('/uploadImage/:pid', verifyToken.verifyTokenAdmin, uploader.array('image', 10),productController.uploadImage)
module.exports = route