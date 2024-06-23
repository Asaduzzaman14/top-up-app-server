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
exports.Services = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_model_1 = require("../auth/auth.model");
const deposit_models_1 = require("./deposit.models");
const DepostiRequest = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data, 'adfsdf');
    data.userId = userId;
    const result = yield deposit_models_1.Deposit.create(data);
    if (data.status === 'completed') {
        const user = yield auth_model_1.User.findById(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User wallet not found');
        }
        // Update the user's wallet balance
        const userWallet = Number(user.wallet) + Number(data.amount);
        const walletData = {
            wallet: userWallet,
        };
        yield auth_model_1.User.findByIdAndUpdate({ _id: userId }, walletData, {
            new: true,
        });
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Deposit request');
    }
    return result;
});
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const depositRequest = yield deposit_models_1.Deposit.findById(id);
    console.log(depositRequest);
    if (!depositRequest) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Deposit Request not found');
    }
    if (depositRequest.status != 'pending') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Deposit Request Already Updated');
    }
    if (payload.status === 'completed') {
        const user = yield auth_model_1.User.findById(depositRequest.userId);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User wallet not found');
        }
        // Update the user's wallet balance
        const userWallet = Number(user.wallet) + Number(depositRequest.amount);
        const walletData = {
            wallet: userWallet,
        };
        yield auth_model_1.User.findByIdAndUpdate({ _id: depositRequest.userId }, walletData, {
            new: true,
        });
    }
    const result = yield deposit_models_1.Deposit.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const getDepositData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }
        const result = yield deposit_models_1.Deposit.find({ userId });
        return result;
    }
    catch (error) {
        return null;
    }
});
const getAllAdminData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('adad');
    const result = yield deposit_models_1.Deposit.find({}).populate('userId');
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield deposit_models_1.Deposit.findByIdAndDelete(id);
    return result;
});
exports.Services = {
    DepostiRequest,
    updateDataById,
    getDepositData,
    getAllAdminData,
    deleteData,
};
