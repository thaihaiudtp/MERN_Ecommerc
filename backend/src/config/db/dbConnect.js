const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Ecommerc')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Cannot connect')
    }
}

module.exports = {connect}