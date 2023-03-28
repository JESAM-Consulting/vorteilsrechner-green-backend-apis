const jwt = require("jsonwebtoken")
const enums = require("../json/enums.json")
const message = require("../json/message.json")
const userFormModel = require("../models/userMaster")

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) return res.status(enums.HTTP_CODES.NOT_ACCEPTABLE).send({ message: message.NO_TOKEN })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        let user = await userFormModel.findOne({ _id: decoded.id }).lean();
        if (!user) return res.status(enums.HTTP_CODES.NOT_FOUND).send({ message: message.USER_NOT_FOUND });
        req.user = user;
        next();
    } catch (err) {
        return res.status(enums.HTTP_CODES.NOT_ACCEPTABLE).send({ message: message.INVALID_TOKEN, error: err.message })
    }
}

module.exports = {
    auth
}