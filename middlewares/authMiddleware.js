const jwt = require("jsonwebtoken");
const config = require("../config/database");

// Middleware to authenticate user
exports.authMiddleware = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token part
  
    // Check if no token
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
  
    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use process.env.JWT_SECRET directly
  
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
  

// // Middleware to check admin role
// exports.adminMiddleware = (req, res, next) => {
//   // const {username} = req.user;
//   console.log("Role2:", req.user);
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ msg: "Unauthorized access" });
//   }
// };
