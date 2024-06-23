"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    img: {
        type: String,
        required: [true, 'image is required'],
    },
    url: {
        type: String,
        required: [true, 'url is required'],
    },
}, { timestamps: true });
exports.Banner = (0, mongoose_1.model)('banners', bannerSchema);
