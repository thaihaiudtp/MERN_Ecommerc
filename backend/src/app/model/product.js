const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')
const softDelete = require('mongoose-delete')
const ProductSchema = new Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    slug: {type: String, slug: "title", unique: true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category"},
    quantity: {type: Number, default: 0},
    sold: {type:Number, default: 0},
    image: {type:Array}
}, {
    timestamps: true
})
ProductSchema.plugin(softDelete, {deletedAt: true})
ProductSchema.pre('save', async function(next) {
    if(!this.slug){
        let slug = slugify(this.title, {lower: true, strict: true})
        let count = 1
        const originSlug = slug
        const ProductModel = this.constructor

        while (await ProductModel.countDocuments({ slug }) > 0) {
            slug = `${originSlug}-${count}`;
            count++;
        }

        this.slug = slug;
    }
    next();
})
module.exports = mongoose.model('product', ProductSchema)