const message = require( "../json/message.json" )
const userModel = require("../models/userMaster")

const validateAdmin = async ( decoded ) => {
    if(decoded.userId){
        const userExists = await userModel.findOne({_id: decoded.userId})
        if(userExists){
            if(userExists.role === "admin"){
                return {
                    success: true,
                    data: userExists
                }
            }else{
                return {
                    success: false,
                    data: message.ADMIN_NOT_FOUND
                }
            }
        }else{
            return {
                success: false,
                data: message.INVALID_USER
            }
        }
    }else{
        return {
            success: false,
            data: message.INVALID_USER
        }
    }
}

const validateUser = async ( decoded ) => {
    if ( decoded.userId ) {
        const userExists = await userModel.findOne( { _id: decoded.userId } )
        if ( userExists ) {
            if ( userExists.role === "user" ) {
                return {
                    success: true,
                    data: userExists
                }
            } else {
                return {
                    success: false,
                    data: message.USER_NOT_FOUND
                }
            }
        } else {
            return {
                success: false,
                data: message.INVALID_USER
            }
        }
    } else {
        return {
            success: false,
            data: message.INVALID_USER
        }
    }
}

const validateVendor = async ( decoded ) => {
    if ( decoded.userId ) {
        const userExists = await userModel.findOne( { _id: decoded.userId } )
        if ( userExists ) {
            if ( userExists.role === "vendor" ) {
                return {
                    success: true,
                    data: userExists
                }
            } else {
                return {
                    success: false,
                    data: message.VENDOR_NOT_FOUND
                }
            }
        } else {
            return {
                success: false,
                data: message.INVALID_USER
            }
        }
    } else {
        return {
            success: false,
            data: message.INVALID_USER
        }
    }
}

module.exports = {
    validateAdmin,
    validateUser,
    validateVendor
}