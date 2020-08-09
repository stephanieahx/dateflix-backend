const ajv = require('ajv'); // require ajv library 
const Ajv = new ajv({ // add ajv settings
    useDefault: true,
    coerceTypes: true,
    allErrors: true,
});
const profileSchema = require('./schema/profileSchema'); //import schema
const validator = Ajv.compile(profileSchema);
const ValidationError = require('../exceptions/validatorError');

module.exports = {
        validateProfile(profile) {
            const isValid = validator(profile);
            if(!isValid){
                console.log(`Validation Error: ${JSON.stringify(validator.errors)}`);
                throw new ValidationError(validator.errors);
            }
            // Add value for Updated At date
            profile.updatedAt = profile.updatedAt ? new Date(profile.updatedAt) : new Date();
            return isValid;
        }
};
