const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Get MongoDB username, password, and URL suffix from environment variables
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URL_SUFFIX = process.env.MONGODB_URL_SUFFIX;

// Use Mongoose to connect to MongoDB using the provided credentials
async function connectToDatabase() {
  try {
    const mongodbUri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL_SUFFIX}`;
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDatabase(); // Call the async function to establish the connection

module.exports = mongoose; // Export the Mongoose instance
