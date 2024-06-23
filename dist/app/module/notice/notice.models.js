"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
const mongoose_1 = require("mongoose");
const noticeSchema = new mongoose_1.Schema({
    notice: {
        type: String,
        required: [true, 'notice is required'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, { timestamps: true });
exports.Notice = (0, mongoose_1.model)('notices', noticeSchema);
