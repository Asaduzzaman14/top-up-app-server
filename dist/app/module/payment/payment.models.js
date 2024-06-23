"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    apiKey: {
        type: String,
        required: [true, 'apiKey is required'],
    },
    pannelUrl: {
        type: String,
        required: [true, 'apiKey is required'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
}, { timestamps: true });
exports.Payments = (0, mongoose_1.model)('payment', productSchema);
