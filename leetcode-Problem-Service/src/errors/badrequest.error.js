const BaseError = require('./base.error')
const { StatusCodes } = require('http-status-codes')

class BadRequests extends BaseError {
    constructor(propertyName) {
        super("BadRequest", StatusCodes.BAD_REQUEST,`Invalid structure for ${propertyName} provided`)
    }
}


module.exports = BadRequests;