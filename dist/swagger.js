"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: "ReavDev End Point Documentation",
            version: "1.0.0",
            description: "API for ReavDev End Point Documentation",
        },
    },
    apis: ["./src/routes/*.route.ts", "./src/index.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
module.exports = specs;
