const mongoose = require("mongoose");

// Define a Mongoose schema for users.
const userSchema = new mongoose.Schema(
  {
    // The first name of the user.
    firstName: {
      type: String,
      required: true,
    },
    // The last name of the user.
    lastName: {
      type: String,
      required: true,
    },
    // The email address of the user (unique and trimmed).
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // The user's password.
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Add timestamps for 'createdAt' and 'updatedAt.'
    timestamps: true,
  }
);

// Create a Mongoose model named 'users' using the defined schema.
module.exports = mongoose.model("users", userSchema);
