const Product = require('../model/product')

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
    async delete(req, res){
        
    }
}
module.exports = new ProductController