module.exports = {
    type: 'object',
    // required: ['age', 'gender'],
    properties: {
        gender: {
            type: 'string'
        },
        age: {
            type: 'number',
            minimum: 18
        },
        updatedAt: {
            type: 'string', 
            format: 'date-time'
        }
    }
};