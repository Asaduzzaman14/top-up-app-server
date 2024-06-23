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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const auth_model_1 = require("../auth/auth.model");
const updateDataById = (id, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndUpdate({ _id: id }, paylode, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndDelete(id);
    return result;
});
const getProfileData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield auth_model_1.User.findById(id);
    return profile;
});
const getAllAdminData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.find({});
    return result;
});
exports.Services = {
    updateDataById,
    deleteData,
    getProfileData,
    getAllAdminData,
};
