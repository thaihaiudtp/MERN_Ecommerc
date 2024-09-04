const express = require('express')
const router = express.Router()
const userController = require('../app/controller/userController')
router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
module.exports = router