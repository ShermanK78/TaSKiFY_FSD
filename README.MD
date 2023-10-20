# TaSKiFY Web App

###Installation, Configuration & Testing

This guide provides users with clear instructions on how to set up the application on their local machines, including modifying MongoDB URIs and API keys as needed.

---

## Installation and Local Setup

In this section, we'll provide step-by-step instructions for users to install and run the application on their local machines. This includes the necessary configuration steps, such as modifying MongoDB URIs and API keys.

### Prerequisites

Before you start, ensure you have the following prerequisites:

- Node.js: You can download and install Node.js from [here](https://nodejs.org/).

### Installation

Follow these steps to set up and run the application locally:

1. **Clone the Repository:**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/ShermanK78/taskify.git
   ```

2. **Navigate to the Project Directory:**

   Change your working directory to the project folder:

   ```bash
   cd taskify
   ```

3. **Install Dependencies:**

   Run the following command to install the required dependencies for both the server and client:

   ```bash
   npm install
   ```

### Configuration

To make the application work on your local machine, you need to configure the following settings:

#### MongoDB Configuration

1. You should have a MongoDB database up and running. You can set up a free MongoDB database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. A. Once you have your MongoDB credentials, create a Project, then click to ‘Connect’ .
    B. Select ‘Shell’, download Mongo DB Shell [if required], and follow the instructions.
    C. Once logged in, note the ‘Connecting to:’ URI [see below]
       

```bash
Current Mongosh Log ID: [***OMITTED***]
Connecting to:       mongodb+srv://<credentials>@[***OMITTED***].[***OMITTED***].mongodb.net/?appName=mongosh+1.10.5
Using MongoDB:          6.0.11 (API Version 1)
Using Mongosh:          1.10.5
```
 D. Copy the URL Suffix below:

```bash
@[***OMITTED***].[***OMITTED***].mongodb.net/?appName=mongosh+1.10.5
```
 F. Navigate to the dbConfig.js file, and add YOUR suffix [in the example below, mine is: @hypdevfullstackdev001.5er5ja1.mongodb.net/?appName=mongosh+1.10.5]` to the #mongoose.connect method below:
```bash
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
```

3. **Server & API configuration:**

   In the project directory, navigate to the server folder:

   ```bash
   cd server
   ```

   Create a ‘.env’ file within the server folder. Open this file using a text editor.

4. Using the file structure below, create the required variables, then input the required values. The MongoDB values can be obtained from your Mongo DB credentials, the SECRET_KEY is any string of your choosing, without spaces or special characters that are not URL-encoded. 

```bash
MONGODB_USERNAME=Your MongoDB Username
MONGODB_PASSWORD=Your MongoDB Password
TOKEN_SECRET=Your Secret Key
```

```
### Starting the Application

Now that you have cloned the repository, installed dependencies, and configured the necessary settings, follow these steps to start the application locally:

#Option 1:

1. In the root directory, run the following command to start the server: 

```bash
npm start
```
The application’s server and client will start concurrently. 

#Option 2:

1. **Start the Server:**

   Navigate to the server directory: 

   ```bash
   cd server
   ```

   run the following command to start the server:

   ```bash
   node server.js
   ```

   The server should start at `http://localhost:5000`.

2. **Start the Client:**

   Open a new terminal window and navigate to the client directory:

   ```bash
   cd ../client
   ```

   Run the following command to start the client:

   ```bash
   npm start
   ```

   The client should start at `http://localhost:3000`.

### Testing

You can run tests for the application using the following commands:

- **Server Tests:** In the server directory, run `npx jest db.test.js` to execute server tests.

- **Client Tests:** In the client directory, run `npm test` to run client tests.

That's it! You now have the application running locally on your machine.

---

## Features and Packages

This section outlines the features developed for the web application along with specific packages and tools used in their implementation.

### 1. User Registration

- **Description**: Users can create an account by providing their personal details, including first name, last name, email, and password.
- **Validation**: Comprehensive data validation ensures that all registration fields are complete and correctly formatted.
- **Feedback**: Users receive real-time feedback, including success and error messages during the registration process.
- **Redirect**: After successful registration, users are automatically redirected to the login page.
- **Packages Utilized**: 
  - Ant Design (AntD): Used for creating a user-friendly registration form.
  - Redux: For state management, enabling efficient handling of user data.
  - Redux Toolkit: Simplifies action dispatching and state management.

### 2. User Authentication

- **Description**: Registered users can log in using their email and password to access their accounts.
- **Security**: Passwords are securely hashed and stored in the database for enhanced security.
- **Error Handling**: In case of login errors, users receive informative messages guiding them through the process.
- **Automatic Redirect**: Successfully logged-in users are automatically redirected to the application's main dashboard.
- **Packages Utilized**:
  - Ant Design (AntD): Utilized for creating a user-friendly login form.
  - Express.js: For the back-end, enabling routing and authentication handling.
  - JWT (JSON Web Tokens): To manage user authentication tokens.
  - Redux: Used for state management, storing user data upon login.
  
### 3. User Profile

- **Description**: Authenticated users can view and manage their profiles.
- **Profile Information**: Users can see their personal information, including first name, last name, and email.
- **Profile Update**: The option to update profile information is provided, with validation to ensure data integrity.
- **Profile Image**: Users can upload and display a profile picture.
- **Packages Utilized**:
  - Ant Design (AntD): Used to design the profile page and manage the profile form.
  - Express.js: For routing and handling profile updates.

  
### 4. Task Management

- **Description**: Users can create, update, and track tasks efficiently.
- **Task Creation**: Users can create tasks with names, descriptions, and status (e.g., pending, completed).
- **Task Assignment**: Tasks can be assigned to specific users, and assignees receive notifications.
- **Attachments**: Users can attach files to tasks.
- **Real-Time Updates**: Task statuses and notifications are updated in real-time.
- **Packages Utilized**:
  - Redux: To manage task data and state.
  - Ant Design (AntD): For creating task forms and components.
  - Express.js: Handling task-related routes and real-time updates.
  
### 5. Notifications

- **Description**: Users receive notifications for task assignments and updates.
- **Real-Time**: Notifications are delivered in real-time as tasks are assigned or modified.
- **Read Status**: Users can mark notifications as read to keep track of their tasks.
- **Packages Utilized**:
  - Redux: To manage notification data and status.
  - Express.js: Handling notification routes and real-time updates.


## User Stories and Unique Features

In this section, we will discuss user stories, unique features of the web application, deployment details, and external services used.

### User Stories & Use Cases

## Use Cases

In this section, we will illustrate the main use cases of the application from the perspective of different roles, including new users, registered users, and project owners. We'll describe how these users can interact with the application.

### 1. New User Registration

**Use Case:** As a new user, I want to register and create an account to access the application's features.

**Steps:**

1. Open the application in a web browser.

2. Click on the "Register" or "Sign Up" button.

3. Fill out the registration form, providing your name, email, and a secure password.

4. Click "Register" to create your account.

5. You will receive a confirmation email to verify your email address.

6. After email verification, you can log in to your new account and access the application's features.




### 2. User Login and Profile Access

**Use Case:** As a registered user, I want to log in and access my profile information.

**Steps:**

1. Open the application in a web browser.

2. Click on the "Log In" button.

3. Enter your registered email and password.

4. Click "Log In."

5. Upon successful login, you will be directed to your profile page.

6. Here, you can view and edit your profile information, including name and email.

### 3. Task Management

**Use Case:** As a user, I want to manage my tasks efficiently, create new tasks, and assign tasks to others.

**Steps:**

1. After logging in, you'll be directed to the dashboard.

2. In the dashboard, you can see a list of tasks assigned to you, including their status.

3. To create a new task, click on "Create Task."

4. Fill out the task details, including name, description, and assignment.

5. Click "Create" to add the task.

6. To assign a task to another user, edit the task and select a user from the list.

7. Save the task to assign it to the selected user.

### 4. Real-Time Notifications

**Use Case:** As a user, I want to receive real-time notifications about updates, task assignments, and important events.

**Steps:**

1. While using the application, you will automatically receive real-time notifications in the user interface.

2. Notifications will appear in the notification center, indicating updates, task assignments, and other important events.

3. You can click on a notification to view more details or take action as needed.

### 5. Project Management

**Use Case:** As a project owner, I want to create and manage projects, add members, and assign tasks within the project.

**Steps:**

1. After logging in as a project owner, you will have access to the project management dashboard.

2. To create a new project, click on "Create Project."

3. Fill out project details, including name and description.

4. Save the project to create it.

5. You can add members to the project by specifying their roles and email addresses.

6. Once members are added, you can assign tasks within the project, assigning them to specific project members.

7. Project members will receive notifications of task assignments and project updates.

---

These use cases demonstrate how different roles can interact with the application, highlighting the steps users would follow to achieve their objectives within the software.


### Unique Features

#### Real-time Task Management

The application offers real-time task management with dynamic updates on task statuses. Users can create, edit, assign, and track tasks efficiently.

#### Interactive Notifications

Users receive real-time notifications that are marked as read and can be cleared. This feature ensures that users stay informed about important events.

#### Project Collaboration

The application enables project owners to create and manage projects, invite team members, and assign tasks within projects. Collaborative project management is made easy.

### Security Measures

- The application uses JWT (JSON Web Tokens) for secure authentication.
- Sensitive data, such as passwords, is stored securely using encryption.
- API keys and secrets are managed securely using environment variables.
- External services are accessed using secured APIs and keys.

### External Services and Packages Utilized

- **Express.js:** Used for building the backend server.
- **React:** Used to create the front-end user interface.
- **Redux:** Employed for state management within the application.
- **Ant Design (AntD):** Utilized for creating elegant and responsive UI components.
- **Tailwind CSS:** Used to style and design the user interface.
- **Helmet:** Implemented for enhancing application security.
- **Jest:** Employed for unit testing the application.
- **MongoDB:** The database management system for data storage.


### Deployment

The application is deployed as a combination of back-end and front-end. The front-end is hosted together with the back-end for scalability and security. 

- Deployed on Render.com
- Access the deployed app by following this link: [(https://taskify-management-app.onrender.com)]

## Thanks and look forward to more innovative and exciting development!






