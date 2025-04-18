module.exports = {
  RegisterUserRequest: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          type: 'string',
          example: 'John Doe'
        },
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
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }
    }
  };