const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file'); // Add this line
const { combine, timestamp, printf, colorize, align } = winston.format;

// Define log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Console transport
    new winston.transports.Console(),
    // File transport (rotated daily)
    new DailyRotateFile({ // Changed from winston.transports.DailyRotateFile
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  exceptionHandlers: [
    new DailyRotateFile({ // Changed here too
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

// Morgan middleware for HTTP request logging
const morganMiddleware = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = { logger, morganMiddleware };