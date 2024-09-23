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
    async getall(req, res) {
        try {
            const queries = { ...req.query }
    
            // Tách các trường đặc biệt
            const specialFields = ['sort', 'limit', 'page', 'fields']
            specialFields.forEach(el => delete queries[el])
    
            // Format lại định dạng của MongoDB
            let queryString = JSON.stringify(queries)
            queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
            let query = JSON.parse(queryString)
    
            // Thêm điều kiện tìm kiếm cho title (nếu có)
            if (queries?.title) {
                query.title = { $regex: queries.title, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa/thường
            }
    
            // Luôn thêm điều kiện để chỉ lấy các sản phẩm chưa bị xóa
            query.deleted = false
    
            // Thực hiện truy vấn
            let queryCommand = Product.find(query).select('-deleted -createdAt -updatedAt')
    
            // Sort (nếu có yêu cầu sắp xếp)
            if (req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ')
                queryCommand = queryCommand.sort(sortBy)
            } else {
                queryCommand = queryCommand.sort('-createdAt')
            }
    
            // Lấy kết quả từ truy vấn
            const products = await queryCommand
    
            return res.status(200).json({
                success: products ? true : false,
                result: products.length,
                data: {
                    products
                }
            })
    
        } catch (error) {
            res.status(404).json({ error: 'ERROR!!!' })
            console.log(error)
        }
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
    async uploadImage(req, res){
        console.log(req.file)
        const {pid} = req.params
        if(!req.file) throw new Error("missing file")
        const upload = await Product.findByIdAndUpdate(pid, {image: req.file.path}, {new: true})
        return res.status(200).json({
            success: upload ? true : false,
            message: upload
        })
    }
    async getone(req, res){
        const {slug} = req.params
        const product = await Product.findOne({slug})
        return res.status(200).json({
            success: product ? true : false,
            message: product
        })
    }
}
module.exports = new ProductController