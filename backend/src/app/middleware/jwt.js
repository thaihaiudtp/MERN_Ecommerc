const jwt = require('jsonwebtoken')
const genAccessToken = (id, role) => jwt.sign(
    {_id: id, role},
    process.env.JWT_SECRET,
    {
        expiresIn: "60s"
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