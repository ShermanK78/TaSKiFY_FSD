const router = require("express").Router();
const Notification = require("../models/notificationsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Add a notification
router.post("/add-notification", authMiddleware, async (req, res) => {
  try {
    // Create a new notification based on the request body
    const newNotification = new Notification(req.body);
    await newNotification.save(); // Save the new notification to the database
    res.send({
      success: true,
      data: newNotification,
      message: "Notification added successfully",
    });
  } catch (error) {
    // Handle errors and send a response with an error message
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Get all notifications for the authenticated user
router.get("/get-all-notifications", authMiddleware, async (req, res) => {
  try {
    // Find all notifications for the authenticated user, sorted by createdAt in descending order
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Mark notifications as read for the authenticated user
router.post("/mark-as-read", authMiddleware, async (req, res) => {
  try {
    // Update all unread notifications for the authenticated user to be marked as read
    await Notification.updateMany(
      {
        user: req.body.userId,
        read: false,
      },
      {
        read: true,
      }
    );

    // Retrieve all notifications for the authenticated user after the update
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });

    res.send({
      success: true,
      message: "Notifications marked as read",
      data: notifications,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// Delete all notifications for the authenticated user
router.delete("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    // Delete all notifications for the authenticated user
    await Notification.deleteMany({
      user: req.body.userId,
    });

    res.send({
      success: true,
      message: "All notifications deleted",
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
