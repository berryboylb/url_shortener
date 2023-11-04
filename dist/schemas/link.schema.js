"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LinkSchema = new mongoose_1.Schema({
    originalUrl: {
        type: String,
        required: true,
        lowercase: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});
const Link = (0, mongoose_1.model)("Link", LinkSchema);
exports.default = Link;
