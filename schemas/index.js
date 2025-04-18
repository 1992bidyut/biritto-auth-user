const RegisterUserRequest = require('./User/request/RegisterUserRequest');
const RegisterUserResponse = require('./User/response/RegisterUserResponse');
const UserSchemas = require('./User/response/UserSchemas');
const UserLogin = require('./User/request/UserLogin')
const ErrorResponse = require('./Error/ErrorResponse');

module.exports = {
  schemas: {
    ...UserSchemas,
    ...RegisterUserRequest,
    ...RegisterUserResponse,
    ...UserLogin,
    ...ErrorResponse,
    // Add other schemas here
  }
};