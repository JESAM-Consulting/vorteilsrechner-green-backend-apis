const mongoose = require("mongoose")
const { INTEREST_FUNDING, REACHABILITY, TYPE_OF_BUILDING, ROOF_SHAPE, TYPE_ROOF_COVERING, TYPE_HEATING } = require('../json/enums.json')

const userSchema = new mongoose.Schema(
    {
        Lnews: { type: Boolean },
        Monthlyprice: { type: String },
        agreement: { type: Boolean },
        areaofRoof: { type: String },
        currntPrice: { type: String },
        direction: { type: String },
        eConsumption: { type: Number },
        location: { type: String },
        email: { type: String },
        members: { type: String },
        message: { type: String },
        phone: { type: String },
        pincode: { type: String },
        pitch: { type: String },
        requirementPerYear: { type: String },
        rooftype: { type: String },
        terms: { type: Boolean },
        time: { type: String },
        total20yearSavings: { type: String },
        username: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
        autoCreate: true
    }
)

module.exports = roleModel = mongoose.model("user", userSchema, "user")