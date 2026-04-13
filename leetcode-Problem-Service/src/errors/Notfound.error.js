const BaseError = require('./base.error')
const { StatusCodes } = require('http-status-codes')

class NotFound extends BaseError {
    constructor(resourceName, resourceValue) {
        super("NotFound", StatusCodes.NOT_FOUND,`The requested resource: ${resourceName} with value ${resourceValue} not founnd`, {

            resourceName,
            resourceValue
        })
    }
}


module.exports = NotFound;
