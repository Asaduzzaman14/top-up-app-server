"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const servicesCatagorysSchema = new mongoose_1.Schema({
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
    phone: {
        type: String,
        required: [true, 'phone is required'],
    },
    servicesCatagory: {
        type: mongoose_1.Types.ObjectId,
        ref: 'ServicesCatagory',
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true });
exports.Service = (0, mongoose_1.model)('services', servicesCatagorysSchema);
