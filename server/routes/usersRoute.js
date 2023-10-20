
const router = require('express').Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware.js');


// Register a new user with Gmail middleware
router.post('/register', async (req, res) => {
    try {
        // Check if the user is already registered
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            throw new Error('User has already registered');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // Save the user
        const user = new User(req.body);
        await user.save();
        res.send({
            success: true,
            message: 'User saved successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
});

//Register a new user
router.post('/register', async (req, res) => {
    try {
        //Check if the user is already registered
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            throw new Error('User has already registered');
        }

        //Hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //Save the user

        const user = new User(req.body);
        await user.save();
        res.send({
            success: true,
            message: 'User saved successfully',
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
});

//Login a user
router.post('/login', async (req, res) => {
    try {
        //Check if the user already exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('User not found');
        }
        //Check if the password is correct
        const passwordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passwordCorrect) {
            throw new Error('Invalid password');
        }
        //Create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        res.send({
            success: true,
            data: token,
            message: 'You have successfully signed in'
        })

    } catch (errors) {
        res.send({
            success: false,
            message: 'Unsuccessful login',
        })
    }
});

// get logged in user
router.get("/get-logged-in-user", authMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
  
      // remove the password from the user object
      user.password = undefined;
  
      res.send({
        success: true,
        data: user,
        message: "User fetched successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
});


module.exports = router;

