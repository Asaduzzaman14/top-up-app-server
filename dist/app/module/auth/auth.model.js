"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    role: {
        type: String,
        required: true,
        select: 0,
    },
    phone: {
        type: String,
    },
    wallet: {
        type: String,
        default: '0',
    },
    img: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: 0,
    },
}, { timestamps: true });
adminSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email }, { email: 1, role: 1, password: 1 });
        return user;
    });
};
adminSchema.statics.isPasswordMatch = function (providedPassword, previewsPass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(providedPassword, previewsPass);
    });
};
// hashing password before save document
// user.create() // user.save()
adminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_solt_rounds));
        console.log(user);
        next();
    });
});
exports.User = (0, mongoose_1.model)('users', adminSchema);
