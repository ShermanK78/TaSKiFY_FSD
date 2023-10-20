const router = require("express").Router();

const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

// Create a task
router.post("/create-task", authMiddleware, async (req, res) => {
  try {
    // Create a new task based on the request body
    const newTask = new Task(req.body);
    await newTask.save(); // Save the new task to the database
    res.send({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    // Handle errors and send a response with an error message
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all tasks
router.post("/get-all-tasks", authMiddleware, async (req, res) => {
  try {
    // Remove any request body properties with the value "all" or "userId"
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "all") {
        delete req.body[key];
      }
    });
    delete req.body["userId"];
    // Find all tasks based on the filtered request body properties, populate related data, and sort them by createdAt in descending order
    const tasks = await Task.find(req.body)
      .populate("assignedTo")
      .populate("assignedBy")
      .populate("project")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update a task
router.post("/update-task", authMiddleware, async (req, res) => {
  try {
    // Update a task by its ID using the data in the request body
    await Task.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
      message: "Task updated successfully",
    });
  }catch (error) {
    // Handle errors and send a response with an error message
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete a task
router.post("/delete-task", authMiddleware, async (req, res) => {
  try {
    // Delete a task by its ID
    await Task.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    // Handle errors and send a response with an error message
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
