const UserData = require('./UserSchemas')
module.exports = {
    LoginResponse:{
        type: 'object',
        properties:{
            token: {
                type: 'string',
                example: 'login_token'
            },
            data:{
               ...UserData.UserSchemas,
            }
        }
    }
}