const profile = require('./UserProfile')
module.exports= {
    UserSchemas: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '507f1f77bcf86cd799439011'
            },
            name: {
                type: 'string',
                example: 'John Doe'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'john@example.com'
            },
            role: {
                type: 'string',
                enum: ['user', 'admin'],
                example: 'user'
            },
            profile: {
                type: 'object',
                properties: profile.UserProfile
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2023-01-01T00:00:00Z'
            }
        }
    },
    
  }