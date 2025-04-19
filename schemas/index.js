const RegisterUserRequest = require('./User/request/RegisterUserRequest');
const RegisterUserResponse = require('./User/response/RegisterUserResponse');
const UserSchemas = require('./User/UserSchemas');
const UserLogin = require('./User/request/UserLogin')
const ErrorResponse = require('./Error/ErrorResponse');
const LoginResponse = require('./User/response/LoginResponse')
const AuthErrorResponse = require('./Error/AuthenticationErrorResponse')

module.exports = {
  schemas: {
    ...UserSchemas,
    ...RegisterUserRequest,
    ...RegisterUserResponse,
    ...UserLogin,
    ...LoginResponse,
    ...AuthErrorResponse,
    ...ErrorResponse,
    // Add other schemas here
  }
};