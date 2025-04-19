const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI
    const MONGO_USER = process.env.MONGO_USER
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD
    const MONGO_DB = process.env.MONGO_DB

    const DB_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}/`
    await mongoose.connect(DB_URI, {
      dbName: MONGO_DB, 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;