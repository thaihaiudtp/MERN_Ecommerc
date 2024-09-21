const express = require('express')
const app = express()
const dbConnect = require('./config/db/dbConnect')
const route = require('./routes/route')
const cookies = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookies())  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect.connect()
route(app)
app.listen(process.env.POST, ()=> {
    console.log('Server is running on port 3004')
})