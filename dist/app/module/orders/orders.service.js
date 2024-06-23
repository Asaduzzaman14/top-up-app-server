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
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_model_1 = require("../auth/auth.model");
const products_models_1 = require("../products/products.models");
const orders_models_1 = require("./orders.models");
const create = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = user._id;
    // Function to get the next order number
    const getNextOrderNumber = () => __awaiter(void 0, void 0, void 0, function* () {
        const latestOrder = yield orders_models_1.Order.findOne().sort({ createdAt: -1 }).exec();
        return latestOrder ? latestOrder.orderNumber + 1 : 1;
    });
    // eslint-disable-next-line no-useless-catch
    try {
        const [orderUser, product] = yield Promise.all([
            auth_model_1.User.findById(userId),
            products_models_1.Products.findById(data.productId),
        ]);
        if (!orderUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
        }
        if (!product) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product not found');
        }
        const wallet = Number(orderUser.wallet);
        const price = Number(product.price);
        if (wallet < price) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient balance');
        }
        const newWallet = wallet - price;
        // Start a transaction
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Update the user's wallet
            yield auth_model_1.User.updateOne({ _id: userId }, { wallet: newWallet }, { session });
            // Get the next order number
            const orderNumber = yield getNextOrderNumber();
            const orderData = {
                userId: userId,
                productName: product.name,
                price: product.price,
                playerId: data.playerId,
                orderNumber: orderNumber,
            };
            // Create the order
            const result = yield orders_models_1.Order.create([orderData], { session });
            yield session.commitTransaction();
            session.endSession();
            return result[0];
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create order');
        }
    }
    catch (error) {
        throw error;
    }
});
const getAllData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Order.find({ userId });
    return result;
});
const updateDataById = (id, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    if (paylode.status == 'rejected') {
        console.log(paylode);
        const user = yield auth_model_1.User.findById({ _id: paylode.userId });
        console.log(user);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
        }
        const newWaller = Number(user === null || user === void 0 ? void 0 : user.wallet) + Number(paylode.price);
        const id = paylode.userId;
        const payload = {
            wallet: newWaller,
        };
        yield auth_model_1.User.findByIdAndUpdate({ _id: id }, payload);
    }
    const data = {
        status: paylode.status,
    };
    const result = yield orders_models_1.Order.findByIdAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Order.findByIdAndDelete(id);
    return result;
});
const getAllAdminData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Order.find({}).populate('userId');
    return result;
});
const getWeeklySell = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orders_models_1.Order.aggregate([
        {
            $addFields: {
                price: { $toDouble: '$price' }, // Convert price to double
            },
        },
        {
            $group: {
                _id: {
                    isoWeek: { $isoWeek: '$date' },
                    year: { $year: '$date' },
                },
                totalSales: { $sum: '$price' },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { '_id.year': 1, '_id.isoWeek': 1 },
        },
    ]);
    return orders;
});
exports.Services = {
    create,
    getAllData,
    updateDataById,
    deleteData,
    getAllAdminData,
    getWeeklySell,
};
