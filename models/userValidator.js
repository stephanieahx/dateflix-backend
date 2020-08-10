const ajv = require('ajv'); // require ajv library 
const Ajv = new ajv({ // add ajv settings
    useDefault: true,
    coerceTypes: true,
    allErrors: true,
});
const userSchema = require('./schema/userSchema'); //import schema
const validator = Ajv.compile(userSchema);
const ValidationError = require('../exceptions/validatorError.js');

module.exports = {
        validateUser(user) {
            const isValid = validator(user);
            if(!isValid){
                console.log(`Validation Error: ${JSON.stringify(validator.errors)}`);
                throw new ValidationError(validator.errors);
            }
            // Add value for Created At date
            user.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
            return isValid;
        }
};
