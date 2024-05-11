const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require('passport');
const { validationResult } = require("express-validator");

// Register a new user
exports.register = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Create a new user
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ msg: "Username or email already exists" });
    }

    // Create a new user instance
    user = new User({
      username,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await user.save();

    // Create and return JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Login user
exports.login = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Authenticate user
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create and return JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



// Controller for handling OAuth authentication callback
exports.authCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' })(req, res, next);
};

// Controller for initiating OAuth authentication flow
exports.authGoogle = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })(req, res, next);
};

// Controller for handling successful OAuth authentication
exports.authGoogleCallback = (req, res) => {
  // If authentication is successful, user data is available in req.user
  if (!req.user) {
    return res.redirect('/login'); // Redirect to login page if authentication fails
  }

  // User is authenticated, handle further actions like creating or updating user data
  const user = req.user;

  // You can perform actions like creating a new user account or updating existing user data
  // Example:
  User.findOneAndUpdate(
    { email: user.email },
    { $setOnInsert: { email: user.email, name: user.name } },
    { upsert: true, new: true }
  ).exec((err, user) => {
    if (err) {
      console.error(err);
      return res.redirect('/login'); // Redirect to login page if an error occurs
    }

    // Redirect to dashboard or homepage after successful authentication
    res.redirect('/dashboard');
  });
};




// Sign out
exports.signOut = (req, res) => {
  try {
    // Clear any user-related data from the client-side (e.g., cookies, local storage)
    
    // For example, if using JWT tokens, you can clear the token from the client-side
    res.clearCookie('token');
    
    // Send a response indicating successful sign-out
    res.json({ msg: "Signed out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};