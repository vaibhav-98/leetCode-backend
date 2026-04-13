const BaseError = require('./base.error')
const { StatusCodes } = require('http-status-codes')

class NotImplementError extends BaseError {
    constructor(methodName) {
        super("NotImplementError", StatusCodes.NOT_IMPLEMENTED,`${methodName} Not Implemented`, {} )
    }
}


module.exports = NotImplementError;
