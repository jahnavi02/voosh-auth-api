const express = require("express");
const connectDB = require("./config/database"); // Import the connectDB function
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { errorHandler } = require("./middlewares/errorHandler");


// Import Swagger setup
const { specs, swaggerUi } = require("./config/swagger");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB(); // Call the connectDB function to establish database connection

// Middleware
app.use(express.json());

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
