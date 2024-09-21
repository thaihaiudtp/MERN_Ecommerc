const jwt = require('jsonwebtoken')
const genAccessToken = (id, role, name) => jwt.sign(
    {_id: id, role, name: name},
    process.env.JWT_SECRET,
    {
       expiresIn: "3d"
   }
)

const genRefreshToken = (id) => jwt.sign(
    {_id: id},
    process.env.JWT_SECRET,
    {
        expiresIn: "10d"
    }
)
module.exports = {
    genAccessToken,
    genRefreshToken
}