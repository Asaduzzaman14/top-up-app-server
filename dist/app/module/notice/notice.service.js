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
const notice_models_1 = require("./notice.models");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const isExist = yield notice_models_1.Notice.find({});
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Notise already exist');
    }
    const result = yield notice_models_1.Notice.create(data);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Post notice');
    }
    return result;
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_models_1.Notice.find({
        status: 'active',
    });
    return result;
});
const getAllDataForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_models_1.Notice.find({});
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_models_1.Notice.findById(id);
    return result;
});
const updateDataById = (id, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_models_1.Notice.findByIdAndUpdate({ _id: id }, paylode, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_models_1.Notice.findByIdAndDelete(id);
    return result;
});
exports.Services = {
    create,
    getAllData,
    getSingleData,
    updateDataById,
    deleteData,
    getAllDataForAdmin,
};
