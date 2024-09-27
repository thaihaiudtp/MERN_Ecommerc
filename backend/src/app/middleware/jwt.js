const jwt = require('jsonwebtoken')
const genAccessToken = (id, role, name, email) => jwt.sign(
    {_id: id, role, name: name, email: email},
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