const mongoose = require('mongoose');
require("dotenv").config();


// Get MongoDB username and password from environment variables
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

async function connectToMongoDB() {
  try {
    await mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@hypdevfullstackdev001.5er5ja1.mongodb.net/?appName=mongosh+1.10.5`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
//export function for useage in test
module.exports = { connectToMongoDB };
