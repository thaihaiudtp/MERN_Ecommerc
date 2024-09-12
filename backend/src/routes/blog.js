const express = require('express')
const route = express.Router()
const verifyToken = require('../app/middleware/verifyToken')
const blogController = require('../app/controller/blogController')

route.post('/create', verifyToken.verifyTokenAdmin, blogController.create)
route.put('/update/:bid', verifyToken.verifyTokenAdmin, blogController.update)
route.get('/getall', blogController.getall)
module.exports = route