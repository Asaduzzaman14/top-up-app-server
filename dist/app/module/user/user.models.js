"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'products',
        required: [true, 'Product Id is required'],
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'users',
        required: [true, 'userId is required'],
    },
    status: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('orders', orderSchema);
