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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const services_constant_1 = require("./services.constant");
const services_models_1 = require("./services.models");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const newCustomer = yield services_models_1.Service.create(data);
    if (!newCustomer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to add Customer');
    }
    return newCustomer;
});
const getAllData = (filters, pageinationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination helpers
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(pageinationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondation = [];
    if (searchTerm) {
        andCondation.push({
            $or: services_constant_1.customerSearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // if (searchTerm) {
    //   andCondation.push({
    //     servicesCatagory: filters.servicesCatagory,
    //   });
    // }
    if (Object.keys(filtersData).length) {
        andCondation.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortCondations = {};
    if (sortBy && sortOrder) {
        sortCondations[sortBy] = sortOrder;
    }
    const requestCondetion = andCondation.length > 0 ? { $and: andCondation } : {};
    const result = yield services_models_1.Service.find(requestCondetion)
        .populate('servicesCatagory')
        .populate('user')
        .sort(sortCondations)
        .skip(skip)
        .limit(limit);
    const total = yield services_models_1.Service.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_models_1.Service.findById(id)
        .populate('servicesCatagory')
        .populate('user');
    return result;
});
const updateDataById = (id, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_models_1.Service.findByIdAndUpdate({ _id: id }, paylode, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_models_1.Service.findByIdAndDelete(id);
    return result;
});
exports.Services = {
    create,
    getAllData,
    getSingleData,
    updateDataById,
    deleteData,
};
