const joi = require("joi")
const enums = require("../json/enums.json")
const message = require("../json/message.json")
const userFormModel = require("../models/userMaster")
const jwt = require('jsonwebtoken')

const createForm = {
    // joi schema validation
    validation: joi.object({
        project: joi.string(),
        Leadherkunft: joi.string(),
        Lnews: joi.boolean(),
        Monthlyprice: joi.string(),
        agreement: joi.boolean(),
        areaofRoof: joi.string(),
        currntPrice: joi.string(),
        direction: joi.string(),
        eConsumption: joi.number(),
        location: joi.string(),
        email: joi.string(),
        members: joi.string(),
        message: joi.string(),
        phone: joi.string(),
        pincode: joi.string(),
        pitch: joi.string(),
        requirementPerYear: joi.string(),
        rooftype: joi.string(),
        terms: joi.boolean(),
        time: joi.string(),
        total20yearSavings: joi.string(),
        username: joi.string(),
    }),

    handler: async (req, res) => {
        try {
            if (await userFormModel.findOne({ email: req.body.email })) return res.status(enums.HTTP_CODES.BAD_REQUEST).send({ message: message.USER_EXISTS })
            const createUserForm = await userFormModel.create(req.body)
            const token = jwt.sign({ id: createUserForm._id, email: createUserForm.email }, process.env.JWT_SECRET)

            return res.status(enums.HTTP_CODES.CREATED).send({ data: createUserForm, toekn: token })

        } catch (err) {
            return res.status(enums.HTTP_CODES.BAD_REQUEST).send({ message: message.GENERAL, data: err.message })
        }
    }
}

const getUserForm = {
    handler: async (req, res) => {
        try {
            const { id, project } = req.query

            let criteria = {}
            if (id) criteria._id = id
            if(project) criteria.project = project

            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10

            const countDoc = await userFormModel.find(criteria).countDocuments()
            const findUserForm = await userFormModel
                .find(criteria)
                .sort({ createdAt: -1 })
                .skip(limit * page - limit)
                .limit(limit)

            return res.status(enums.HTTP_CODES.OK).send({ message: message.FORM_FOUND, data: findUserForm, count: countDoc })
        } catch (error) {
            return res.status(enums.HTTP_CODES.BAD_REQUEST).send({ message: message.GENERAL, data: err.message })
        }
    }
}

const updateUserForm = {

    validation: joi.object({
        project: joi.string(),
        Leadherkunft: joi.string(),
        Lnews: joi.string(),
        Monthlyprice: joi.string(),
        agreement: joi.boolean(),
        areaofRoof: joi.string(),
        currntPrice: joi.string(),
        direction: joi.string(),
        eConsumption: joi.number(),
        location: joi.string(),
        email: joi.string(),
        members: joi.string(),
        message: joi.string(),
        phone: joi.string(),
        pincode: joi.string(),
        pitch: joi.string(),
        requirementPerYear: joi.string(),
        rooftype: joi.string(),
        terms: joi.boolean(),
        time: joi.string(),
        total20yearSavings: joi.string(),
        username: joi.string(),
    }),

    handler: async (req, res) => {
        try {
            const updateUserForm = await userFormModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
            if (!updateUserForm) return res.status(enums.HTTP_CODES.BAD_REQUEST).send({ message: message.FORM_NOT_FOUND })
            return res.status(enums.HTTP_CODES.OK).send({ message: message.FORM_UPDATED, data: updateUserForm })
        } catch (error) {
            return res.status(enums.HTTP_CODES.BAD_REQUEST).send({ message: message.GENERAL, data: err.message })
        }
    }
}

const deleteUserForm = {
    handler: async (req, res) => {
        try {
            const deleteUserForm = await userFormModel.findByIdAndDelete(req.query.id)
            if (!deleteUserForm) return res.status(enums.HTTP_CODES.BAD_REQUEST).send({ message: message.FORM_NOT_FOUND })
            return res.status(enums.HTTP_CODES.OK).send({ message: message.FORM_DELETED, data: {} })
        } catch (error) {
            return res.status(enums.HTTP_CODES.BAD_REQUEST).send({ message: message.GENERAL, data: err.message })
        }
    }
}

module.exports = {
    createForm,
    getUserForm,
    updateUserForm,
    deleteUserForm
}