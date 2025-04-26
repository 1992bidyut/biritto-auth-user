const RegisterUserRequest = require('./User/RegisterUserRequest');
const RegisterUserResponse = require('./User/RegisterUserResponse');
const UserSchemas = require('./User/UserSchemas');
const UserProfile = require('./User/UserProfile')
const UserLogin = require('./User/UserLogin')
const LoginResponse = require('./User/LoginResponse')
const UserEducation = require('./User/UserEducation')
const UserProfileUpdate = require('./User/UserProfileUpdate')
const UserProfilePhoto = require('./User/ProfilePhoto')

const AuthErrorResponse = require('./Error/AuthenticationErrorResponse')
const ErrorResponse = require('./Error/ErrorResponse');
const { Container } = require('winston');

module.exports = {
  schemas: {
    ...UserSchemas,
    ...UserProfile,
    ...RegisterUserRequest,
    ...RegisterUserResponse,
    ...UserLogin,
    ...LoginResponse,
    ...UserEducation,
    ...UserProfileUpdate,
    ...UserProfilePhoto,

    ...AuthErrorResponse,
    ...ErrorResponse,
    // Add other schemas here
  }
};