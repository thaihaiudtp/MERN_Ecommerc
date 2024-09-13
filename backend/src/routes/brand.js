const express = require('express')
const route = express.Router()
const verifyToken = require('../app/middleware/verifyToken')
const brandController = require('../app/controller/brandController')

route.get('/getall', brandController.getall)
route.post('/create', verifyToken.verifyTokenAdmin, brandController.create)
route.put('/update/:bcid', verifyToken.verifyToken, brandController.update)
route.delete('/delete/:bcid', verifyToken.verifyTokenAdmin, brandController.delete)

module.exports = route