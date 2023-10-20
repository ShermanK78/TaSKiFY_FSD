const router = require("express").Router();
const Project = require("../models/projectModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

// Create a project
router.post("/create-project", authMiddleware, async (req, res) => {
  try {
    // Create a new project based on the request body
    const newProject = new Project(req.body);
    await newProject.save(); // Save the new project to the database
    res.send({
      success: true,
      data: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    // Handle errors and send a response with an error message
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Get all projects for the authenticated user
router.post("/get-all-projects", authMiddleware, async (req, res) => {
  try {
    // Find all projects owned by the authenticated user, sorted by createdAt in descending order
    const projects = await Project.find({
      owner: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Get a project by its ID
router.post("/get-project-by-id", authMiddleware, async (req, res) => {
  try {
    // Find a project by its ID, populating owner and members
    const project = await Project.findById(req.body._id)
      .populate("owner")
      .populate("members.user");
    res.send({
      success: true,
      data: project,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Get projects by user's role
router.post("/get-projects-by-role", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    // Find projects where the user is a member and sort them by createdAt in descending order
    const projects = await Project.find({ "members.user": userId })
      .sort({
        createdAt: -1,
      })
      .populate("owner");
    res.send({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Edit a project
router.post("/edit-project", authMiddleware, async (req, res) => {
  try {
    // Update a project by its ID using the data in the request body
    await Project.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Delete a project
router.post("/delete-project", authMiddleware, async (req, res) => {
  try {
    // Delete a project by its ID
    await Project.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Add a member to a project
router.post("/add-member", authMiddleware, async (req, res) => {
  try {
    const { email, role, projectId } = req.body;
    // Find the user by their email
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    // Add a new member to the project
    await Project.findByIdAndUpdate(projectId, {
      $push: {
        members: {
          user: user._id,
          role,
        },
      },
    });

    res.send({
      success: true,
      message: "Member added successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Remove a member from a project
router.post("/remove-member", authMiddleware, async (req, res) => {
  try {
    const { memberId, projectId } = req.body;
    // Find the project and remove the member by their ID
    const project = await Project.findById(projectId);
    project.members.pull(memberId);
    await project.save();

    res.send({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
