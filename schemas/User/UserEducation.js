module.exports = {
    UserEducation: {
        type: 'object',
        required: ['school', 'degree', 'fieldOfStudy', 'from'],
        properties: {
          school: {
            type: 'string',
            example: 'National University',
          },
          degree: {
            type: 'string',
            example: 'Bsc/MSC',
          },
          fieldOfStudy: {
            type: 'string',
            example: 'Software Engineering',
          },
          from: {
            type: 'date',
            example: '01-01-2011',
          },
          to: {
            type: 'date',
            example: '31-12-2014',
          },
          current: {
            type: 'Boolean',
            example: '1',
          },
          description: {
            type: 'string',
            example: 'Details discription about your degree',
          }
        },
        example: {
          school: 'National University',
          degree: 'Bsc/MSC',
          fieldOfStudy: 'Software Engineering',
          from: '01-01-2011',
          to: '31-12-2014',
          current: 1,
          description:'Details discription about your degree',
        }
      }
    };