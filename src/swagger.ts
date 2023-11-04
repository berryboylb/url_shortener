import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "ReavDev End Point Documentation",
      version: "1.0.0",
      description: "API for ReavDev End Point Documentation",
    },
  },
  apis: ["./src/routes/*.route.ts"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
