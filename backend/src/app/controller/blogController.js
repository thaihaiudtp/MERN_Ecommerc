const blog = require('../model/blog')
class BlogController {
    async create(req, res){
        const {title, description, category} = req.body
        if(!title || !description || !category) throw new Error("missing input")
        const newBlog = await blog.create(req.body)
        res.status(200).json({
            message: newBlog? "Blog created successfully":"Unsuccess",
            data: newBlog
        })
    }
    async update(req, res){
        const {bid} = req.params
        if(Object.keys(req.body).length === 0) throw new Error("missing input")
        const updateBlog = await blog.findByIdAndUpdate(bid, req.body, {new: true})
        res.status(200).json({
            message: 'Blog updated successfully',
            data: updateBlog
        })
    }
    async getall(req, res){
        const blogs = await blog.find({deleted: false})
        res.status(200).json({
            success: blogs?true:false,
            data: blogs
        })
    }
}

module.exports =  new BlogController