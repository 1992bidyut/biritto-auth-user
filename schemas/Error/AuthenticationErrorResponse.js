module.exports = {
    AuthErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Invalid cradentials!'
          },
        },
      }
    };