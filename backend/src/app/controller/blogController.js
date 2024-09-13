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
    async likeBlog(req, res){
        const {_id} = req.user
        const {bid} = req.params
        if(!bid) throw new Error("missing input")
        const Blog = await blog.findById(bid)
        const alreadyLike = Blog?.like?.find(el => el.toString() === _id)
        if(alreadyLike) {
            const response = await blog.findByIdAndUpdate(bid, {$pull: {like: _id}}, {new: true})
            res.status(200).json({
                success: response ? true : false,
                data: response
            })
        } else {
            const response = await blog.findByIdAndUpdate(bid, {$push: {like: _id}}, {new: true})
            res.status(200).json({
                success: response ? true : false,
                data: response
            })
        }
    }
    async getBlog(req, res){
        const user = '-password -role -deletedAt -createdAt -updatedAt -refreshToken -passwordChangedAt -deleted'
        const {bid} = req.params
        const Blog = await blog.findByIdAndUpdate(bid, {$inc: {numberView: 1}}, {new: true}).populate('like', user)
        res.status(200).json({
            success: Blog ? true : false,
            data: Blog
        })
    }
    async delete(req, res){
        try {
            const {bid} = req.params
            await blog.delete({_id: bid})
            res.status(200).json({
                message: 'Blog deleted successfully'
            })
        } catch (error) {
            console.log(error)
        }
    }
    async uploadImage(req, res){
        console.log(req.file)
        const {bid} = req.params
        if(!req.file) throw new Error("missing file")
        const upload = await blog.findByIdAndUpdate(bid, {image: req.file.path}, {new: true})
        return res.status(200).json({
            success: upload ? true : false,
            message: upload
        })
    }
}

module.exports =  new BlogController