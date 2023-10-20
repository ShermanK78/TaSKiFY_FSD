const express = require("express");
const app = express();
require("dotenv").config();

// Middleware to parse JSON data
app.use(express.json());

// Import the database configuration
const dbConfig = require("./config/dbConfig");

// Security and CORS middleware
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

// Import route handlers for different parts of the API
const usersRoute = require("./routes/usersRoute");
const projectsRoute = require("./routes/projectsRoute");
const tasksRoute = require("./routes/tasksRoute");
const notificationsRoute = require("./routes/notificationsRoute");

// Apply security, CORS, and body parsing middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Define routes for different parts of the API
app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/notifications", notificationsRoute);

// Deployment configuration
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Serve static files from the client's build directory
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    // For any other routes, send the client's index.html
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Node JS server listening on port ${port}`));
