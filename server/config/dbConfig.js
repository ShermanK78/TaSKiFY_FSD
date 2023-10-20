const mongoose = require('mongoose');
require("dotenv").config();

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@hypdevfullstackdev001.5er5ja1.mongodb.net/?appName=mongosh+1.10.5`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectToDatabase(); // Call the async function to establish the connection

module.exports = mongoose; // Export the mongoose instance
