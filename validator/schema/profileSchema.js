module.exports = {
    type: 'object',
    required: ['age', 'gender'],
    properties: {
        gender: {
            type: 'string'
        },
        age: {
            type: 'number',
            min: 18
        },
        updatedAt: {
            type: 'string', 
            format: 'date-time'
        }
    }
};