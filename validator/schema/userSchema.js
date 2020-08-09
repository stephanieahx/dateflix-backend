module.exports = {
    type: 'object',
    // required: ['username', 'password'],
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string',
            // minLength: 5
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
    }
};