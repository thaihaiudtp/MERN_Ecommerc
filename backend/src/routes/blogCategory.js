const express = require('express')
const route = express.Router()
const blogCategoryController = require('../app/controller/blogCategoryController')
const verifyToken = require('../app/middleware/verifyToken')
route.get('/getall', blogCategoryController.getall)
route.post('/create', verifyToken.verifyTokenAdmin, blogCategoryController.create)
route.put('/update/:cid', verifyToken.verifyToken, blogCategoryController.update)
route.delete('/delete/:cid', verifyToken.verifyTokenAdmin, blogCategoryController.delete)
module.exports = route