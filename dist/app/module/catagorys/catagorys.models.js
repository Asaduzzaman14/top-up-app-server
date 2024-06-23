"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    img: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
