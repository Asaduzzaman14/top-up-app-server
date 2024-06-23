"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deposit = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'users',
        required: [true, 'userId is required'],
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'rejected'],
        required: [true, 'status is required'],
    },
    amount: {
        type: String,
        required: [true, 'amount is required'],
    },
    method: {
        type: String,
        required: [true, 'method is required'],
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
    },
    trxId: {
        type: String,
        required: [true, 'trxId is required'],
    },
    token: {
        type: String,
    },
}, { timestamps: true });
exports.Deposit = (0, mongoose_1.model)('deposits', orderSchema);
