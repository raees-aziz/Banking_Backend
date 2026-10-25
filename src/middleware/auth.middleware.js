const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authChecker(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]
        if (!token) return res.status(401).json({ msg: "Unauthorized" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.userId) // match your token payload key

        if (!user) return res.status(401).json({ msg: "Unauthorized" })

        req.user = user   // <-- this is what your controller reads
        next()            // <-- without this, the request hangs
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" })
    }
}

module.exports = { authChecker }