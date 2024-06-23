"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    paymentName: {
        type: String,
        required: [true, 'paymentName is required'],
    },
    img: {
        type: String,
        required: [true, 'img is required'],
    },
    number: {
        type: String,
        required: [true, 'number is required'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, { timestamps: true });
exports.Payments = (0, mongoose_1.model)('manualy-payment', productSchema);
