const { get } = require( "lodash" )
const enums = require( "../json/enums.json" )
const message = require( "../json/message.json" )

const validate = ( path, schema ) => async ( req, res, next ) => {
    if ( ![ "body" ].includes( path ) ) {
        console.log( `validation-warning == checking only body but got path ${path}` )
        return next()
    }

    const data4validation = get( req, path )
    const { value, error } = schema.validate( data4validation,
        {
            allowUnknown: true,
            stripeUnknown: true
        } )

    if ( error ) {
        console.log( `ERROR encountered at path ${error}` )
        return res
            .status( enums.HTTP_CODES.BAD_REQUEST )
            .send( { message: message.INVALID_PARAMS, path: req.path.slice(1), error: error.message } )
    } else {
        req[ path ] = value
        next()
    }
}

module.exports = {
    validate
}