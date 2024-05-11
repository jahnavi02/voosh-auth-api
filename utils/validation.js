const { body } = require("express-validator");

// Validation for updating user profile
exports.validateProfileUpdate = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("bio").optional().isString().withMessage("Bio must be a string"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("photo").optional().isURL().withMessage("Invalid photo URL"),
  body("isPublic").optional().isBoolean().withMessage("isPublic must be a boolean"),
];
