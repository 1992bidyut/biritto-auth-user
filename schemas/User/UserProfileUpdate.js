const social = require('./UserSocial')
module.exports= {
    UserProfileUpdate: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Full Name'
                },
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
                    example: 'www.bio-site.com'
                },
                location:{
                    type: 'string',
                    example: 'www.bio-site.com'
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
    
  }