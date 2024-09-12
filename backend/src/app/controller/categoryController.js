const Category = require('../model/category')
class CategoryController {
    async create(req, res){
        const newCategory = await Category.create(req.body)
        res.status(201).json({
            message: 'Category created successfully',
            data: newCategory
        })
    }
    async update(req, res){
        const {cid} = req.params
        const updatedCategory = await Category.findByIdAndUpdate(cid, req.body, {new: true})
        res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory
        })
    }
    async delete(req, res){
        const {cid} = req.params
        await Category.findByIdAndDelete(cid)
        res.status(200).json({
            message: 'Category deleted successfully'
        })
    }
    async getall(req, res){
        const categories = await Category.find()
        res.status(200).json({
            success: categories?true:false,
            data: categories
        })
    }
}

module.exports = new CategoryController