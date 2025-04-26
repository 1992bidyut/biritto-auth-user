const education = require('./UserEducation')
const social = require('./UserSocial')
module.exports= {
    UserProfilePhoto: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary',
                description: 'Image file (JPG/PNG)'
            },
        }
    },
    
  }