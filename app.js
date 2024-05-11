const express = require("express");
const connectDB = require("./config/database"); // Import the connectDB function
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { errorHandler } = require("./middlewares/errorHandler");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();

// Import Swagger setup
const { specs, swaggerUi } = require("./config/swagger");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB(); // Call the connectDB function to establish database connection

// Middleware
app.use(express.json());

// Configure Passport.js for Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Find or create user based on profile data
  // Example:
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return done(err, user);
  });
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Setup Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Mount Swagger UI

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
