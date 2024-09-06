const Product = require('../model/product')
const slugify = require('slugify')
class ProductController {
    async create(req, res){
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: 'Please fill all fields'})
        } else {
            const newProduct = await Product.create(req.body)
            return res.status(200).json({
                success: newProduct ? true: false,
                message: newProduct
            })
        }
    }
    async getall(req, res){
        const products = await Product.find({deleted: false}).select("-deleted")
        return res.status(200).json({
            success: products ? true: false,
            message: products
        })
    }
    async update(req, res) {
        const {pid} = req.params
        if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
        const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
        console.log(updateProduct)
        return res.status(200).json({
            success:  updateProduct? true: false,
            message: updateProduct
        })
    }
    async delete(req, res){
        const {pid} = req.params
        const deleteProduct = await Product.delete({_id: pid})
        return res.status(200).json({
            success:  deleteProduct? true: false,
            message: "Thành công"
        })
    }
    async getdeleted(req, res){
        const products = await Product.find({deleted: true}).select("-deleted")
        return res.status(200).json({
            success: products ? true: false,
            message: products
        })
    }
}
module.exports = new ProductController