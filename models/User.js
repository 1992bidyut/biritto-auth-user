const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [user, publisher, admin]
 *           default: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 65a8f27c1e4e8a0012e5f7d2
 *         name: John Doe
 *         email: john@example.com
 *         role: user
 *         createdAt: 2024-01-18T08:32:28.000Z
 */

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'publisher', 'admin'],
    default: 'user'
  },
  profile: {
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    location: String,
    profilePhoto: {
      type: String,
      default: 'default.jpg'
    },
    social: {
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String,
      youtube: String
    },
    skills: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.length <= 10;
        },
        message: 'Cannot have more than 10 skills'
      }
    },
    education: [
      {
        school: {
          type: String,
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        fieldOfStudy: {
          type: String,
          required: true
        },
        from: {
          type: Date,
          required: true
        },
        to: Date,
        current: {
          type: Boolean,
          default: false
        },
        description: String
      }
    ],
    experience: [
      {
        title: {
          type: String,
          required: true
        },
        company: {
          type: String,
          required: true
        },
        location: String,
        from: {
          type: Date,
          required: true
        },
        to: Date,
        current: {
          type: Boolean,
          default: false
        },
        description: String
      }
    ]
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return require('jsonwebtoken').sign(
    { id: this._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);