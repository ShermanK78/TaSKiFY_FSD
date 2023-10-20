const mongoose = require("mongoose");

// Define a Mongoose schema for tasks.
const taskSchema = new mongoose.Schema(
  {
    // The name of the task.
    name: {
      type: String,
      required: true,
    },
    // A description associated with the task.
    description: {
      type: String,
      required: true,
    },
    // Status of the task (default is "pending").
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    // Reference to the project the task belongs to, linking to the 'projects' collection.
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    // Reference to the user the task is assigned to, linking to the 'users' collection.
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    // Reference to the user who assigned the task, linking to the 'users' collection.
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    // Attachments associated with the task, stored as an array.
    attachments: {
      type: Array,
      default: [],
    },
  },
  {
    // Add timestamps for 'createdAt' and 'updatedAt.'
    timestamps: true,
  }
);

// Create a Mongoose model named 'tasks' using the defined schema.
module.exports = mongoose.model("tasks", taskSchema);
