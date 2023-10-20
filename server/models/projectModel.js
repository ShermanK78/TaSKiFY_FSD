const mongoose = require("mongoose");

// Define a Mongoose schema for project members.
const memberSchema = new mongoose.Schema({
  // Reference to the 'users' collection, representing the user associated with the member.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // Role of the member within the project.
  role: {
    type: String,
    required: true,
  },
});

// Define a Mongoose schema for projects.
const projectSchema = new mongoose.Schema(
  {
    // The name of the project.
    name: {
      type: String,
      required: true,
    },
    // A description associated with the project.
    description: {
      type: String,
      required: true,
    },
    // Status of the project (default is "active").
    status: {
      type: String,
      required: true,
      default: "active",
    },
    // Reference to the project owner, linking to the 'users' collection.
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // An array of project members using the 'memberSchema.'
    members: [memberSchema],
  },
  {
    // Add timestamps for 'createdAt' and 'updatedAt.'
    timestamps: true,
  }
);

// Create a Mongoose model named 'projects' using the defined schema.
module.exports = mongoose.model("projects", projectSchema);
