const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Voosh-assignment",
      version: "1.0.0",
      description: "Authentication APIs of the complete user flow",
    },
    // Security definitions
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
  },
  apis: ["./routes/*.js"], // Path to the files containing API routes
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
