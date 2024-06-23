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
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const products_models_1 = require("../products/products.models");
const catagorys_models_1 = require("./catagorys.models");
const catagorys_utils_1 = require("./catagorys.utils");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCustomer = yield catagorys_models_1.Category.create(data);
    if (!newCustomer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to add Catagory');
    }
    return newCustomer;
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, catagorys_utils_1.getCategoriesWithProducts)();
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield catagorys_models_1.Category.findById(id);
    return result;
});
const updateDataById = (id, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield catagorys_models_1.Category.findByIdAndUpdate({ _id: id }, paylode, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all products associated with the category
    yield products_models_1.Products.deleteMany({ categoryId: id });
    // Delete the category
    const result = yield catagorys_models_1.Category.findByIdAndDelete(id);
    return result;
});
// for admin
const getAllDataFOrAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield catagorys_models_1.Category.find({});
    return result;
});
exports.Services = {
    create,
    getAllData,
    getSingleData,
    updateDataById,
    deleteData,
    getAllDataFOrAdmin
};
