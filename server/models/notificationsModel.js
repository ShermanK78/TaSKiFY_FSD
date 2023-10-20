const mongoose = require("mongoose");

// Define a Mongoose schema for notifications.
const notificationsSchema = new mongoose.Schema(
  {
    // Reference to the 'users' collection, representing the user associated with the notification.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    // The title of the notification.
    title: {
      type: String,
      required: true,
    },
    // A description associated with the notification.
    description: {
      type: String,
      required: true,
    },
    // A URL or action associated with the notification, indicating where to navigate when clicked.
    onClick: {
      type: String,
      required: true,
    },
    // A flag indicating whether the notification has been read (default is false).
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Add timestamps for 'createdAt' and 'updatedAt.'
    timestamps: true,
  }
);

// Create a Mongoose model named 'notifications' using the defined schema.
module.exports = mongoose.model("notifications", notificationsSchema);
