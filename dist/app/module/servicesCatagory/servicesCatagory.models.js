"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesCatagory = void 0;
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
}, { timestamps: true });
exports.ServicesCatagory = (0, mongoose_1.model)('ServicesCatagory', servicesCatagorysSchema);
