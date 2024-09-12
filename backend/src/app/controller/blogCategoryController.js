const blogCategory = require('../model/blogCategory')
class BlogCategoryController {
    async create(req, res){
        const newBlogCategory = await blogCategory.create(req.body)
        res.status(201).json({
            message: 'Blog-Category created successfully',
            data: newBlogCategory
        })
    }
    async update(req, res){
        const {bcid} = req.params
        const updateBlogCategory = await blogCategory.findByIdAndUpdate(bcid, req.body, {new: true})
        res.status(200).json({
            message: 'Blog-Category updated successfully',
            data: updateBlogCategory
        })
    }
    async delete(req, res){
        const {bcid} = req.params
        await blogCategory.findByIdAndDelete(bcid)
        res.status(200).json({
            message: 'Blog-Category deleted successfully'
        })
    }
    async getall(req, res){
        const blogcategories = await blogCategory.find()
        res.status(200).json({
            success: blogcategories?true:false,
            data: blogcategories
        })
    }

}

module.exports = new BlogCategoryController