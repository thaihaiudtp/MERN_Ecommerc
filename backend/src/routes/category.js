const categoryController = require('../app/controller/categoryController')
const express = require('express')
const verifyToken = require('../app/middleware/verifyToken')
const route = express.Router()
route.get('/getall', categoryController.getall)
route.post('/create', verifyToken.verifyTokenAdmin, categoryController.create)
route.put('/update/:cid', verifyToken.verifyToken, categoryController.update)
route.delete('/delete/:cid', verifyToken.verifyTokenAdmin, categoryController.delete)

module.exports = route