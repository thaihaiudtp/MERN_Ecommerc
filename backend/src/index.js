const express = require('express')
const app = express()
const dbConnect = require('./config/db/dbConnect')
const route = require('./routes/route')
const cookies = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
app.use(cookies())  
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect.connect()
route(app)
app.listen(process.env.POST, ()=> {
    console.log('Server is running on port 3004')
})