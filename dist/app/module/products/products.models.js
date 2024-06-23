"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    catagoryId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: String,
        required: [true, 'price is required'],
    },
}, { timestamps: true });
exports.Products = (0, mongoose_1.model)('products', productSchema);
