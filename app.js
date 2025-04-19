const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const { logger, morganMiddleware } = require('./config/logger');
const { requestLogger, errorLogger } = require('./middleware/loggerMiddleware');
const morgan = require('morgan')


// Connect to database
connectDB();

// Route files
const auth = require('./routes/authRoutes');
const users = require('./routes/userRoutes');
const profile = require('./routes/profileRoutes');

const app = express();
app.use(requestLogger);

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Morgan HTTP request logging
app.use(morgan('combined', { stream: morganMiddleware }));
// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/profile', profile);
// Add this before your error handler middleware
app.use(errorLogger);
// Error handler middleware
app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// const server = app.listen(
//   PORT,
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
// );

const setupSwagger = require('./config/swagger');
setupSwagger(app);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;