const user = require('./user')
const product = require('./product')
const category = require('./category')
const blogcategory = require('./blogCategory')
const blog = require('./blog')
const brand = require('./brand')
const coupon = require('./coupon')
function route(app){
    app.use('/user', user)
    app.use('/product', product)
    app.use('/category', category)
    app.use('/blogCategory', blogcategory)
    app.use('/blog', blog)
    app.use('/brand', brand)
    app.use('/coupon', coupon)
}

module.exports = route