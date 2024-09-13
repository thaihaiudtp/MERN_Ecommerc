const Brand = require('../model/brand')
class BrandController {
    async create(req, res){
        const newBrand = await Brand.create(req.body)
        res.status(201).json({
            message: 'Blog-Category created successfully',
            data: newBrand
        })
    }
    async update(req, res){
        const {bcid} = req.params
        const updateBrand = await Brand.findByIdAndUpdate(bcid, req.body, {new: true}).select('-deleted -createdAt -updatedAt')
        res.status(200).json({
            message: 'Brand updated successfully',
            data: updateBrand
        })
    }
    async delete(req, res){
        const {bcid} = req.params
        await Brand.delete({_id: bcid})
        res.status(200).json({
            message: 'Brand deleted successfully'
        })
    }
    async getall(req, res){
        const brands = await Brand.find({ deleted: false }).select('-deleted -createdAt -updatedAt')
        res.status(200).json({
            success: brands?true:false,
            data: brands
        })
    }

}
module.exports = new BrandController