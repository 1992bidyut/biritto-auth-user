module.exports = {
    UserLogin: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'john@example.com'
          },
          password: {
            type: 'string',
            format: 'password',
            minLength: 6,
            example: 'password123'
          }
        },
        example: {
          email: 'john@example.com',
          password: 'password123'
        }
      }
    };