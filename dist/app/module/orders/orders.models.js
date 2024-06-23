"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'users',
        required: [true, 'userId is required'],
    },
    status: {
        type: String,
        enum: ['pending', 'complete', 'rejected'],
        default: 'pending',
    },
    // img: {
    //   type: String,
    //   required: [true, 'img is required'],
    // },
    price: {
        type: String,
        required: [true, 'price is required'],
    },
    productName: {
        type: String,
        required: [true, 'productName is required'],
    },
    playerId: {
        type: String,
        required: [true, 'playerId is required'],
    },
    orderNumber: {
        type: Number,
        required: [true, 'orderNumber is required'],
        unique: true,
    },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('orders', orderSchema);
