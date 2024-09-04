const jwt = require('jsonwebtoken')

class VerifyToken {
    async verifyToken(req, res, next){
        // Kiểm tra xem yêu cầu có chứa header 'Authorization' không và header này có bắt đầu bằng 'Bearer' không
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token){
            return res.status(401).json({ message: "Access Token is missing" })
        } else {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decode){
                if(err) {
                    return res.status(401).json({message: "Invalid Token"})
                }
                req.user = decode
                next()
            })
        }

    }
}
module.exports = new VerifyToken