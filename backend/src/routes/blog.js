const express = require('express')
const route = express.Router()
const verifyToken = require('../app/middleware/verifyToken')
const blogController = require('../app/controller/blogController')
const uploaded = require('../config/cloudinary.config')
route.post('/create', verifyToken.verifyTokenAdmin, blogController.create)
route.put('/update/:bid', verifyToken.verifyTokenAdmin, blogController.update)

route.put('/like/:bid', verifyToken.verifyToken, blogController.likeBlog)
route.delete('/delete/:bid', verifyToken.verifyTokenAdmin, blogController.delete)
route.get('/:bid', blogController.getBlog)
route.put('/uploadImage/:bid', verifyToken.verifyTokenAdmin, uploaded.single('image'), blogController.uploadImage)
route.get('/', blogController.getall)
module.exports = route