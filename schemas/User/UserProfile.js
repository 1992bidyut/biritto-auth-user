const education = require('./UserEducation')
const social = require('./UserSocial')
module.exports= {
    UserProfile: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '507f1f77bcf86cd799439011'
            },
            profile: {
                type: 'object',
                properties: {
                    bio: {
                        type: 'string',
                        example: 'Software developer'
                    },
                    profileImage: {
                        type: 'string',
                        example: 'profile.jpg'
                    },
                    website:{
                        type: 'string',
                        example: 'http://www.bio-site.com'
                    },
                    location:{
                        type: 'string',
                        example: 'www.bio-site.com'
                    },
                    education:{
                        type: 'array',
                        items: education.UserEducation
                    },
                    skills:{
                        type:'array',
                        items: {
                            type:'string',
                            example:'developer'
                        }
                    },
                    social:{...social.UserSocial},
                }
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2023-01-01T00:00:00Z'
            }
        }
    },
    
  }