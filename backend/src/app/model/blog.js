const mongoose = require('mongoose')
const softDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numberView: {
        type: Number,
        default: 0,
    },

    like: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    image: {
        type: Array,
        default: ['https://a.storyblok.com/f/262429/1080x1920/44eac8dd37/marketing_thumbnail_illustration.jpg/m/']
    },
    author: {
        type: String,
        default: 'admin'
    }
}, {
    timestamps: true,
    toJson: {virtuals: true},
    toObject: {virtuals: true}
})
BlogSchema.plugin(softDelete, {deletedAt: true})
module.exports = mongoose.model('blog', BlogSchema)