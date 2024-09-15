const mongoose = require('mongoose'); // Erase if already required


// Declare the Schema of the Mongo model
const OrderSchema = new mongoose.Schema({
    products:[{
        product: {type: mongoose.Types.ObjectId, ref: 'product'},
        count: Number,
        color: String,

    }],
    status:{
        type:String,
        default: 'Pending',
        enum: ['Cancelled', 'Pending', 'Succees']
    },
    total: Number,
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: 'coupon'
    },
    orderBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('order', OrderSchema);