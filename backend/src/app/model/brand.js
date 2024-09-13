const mongoose = require('mongoose')
const softDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    title: {type: String, required: true, unique: true, index: true}
}, {
    timestamps: true
})
BrandSchema.plugin(softDelete, {deletedAt: true})
module.exports = mongoose.model('brand', BrandSchema)