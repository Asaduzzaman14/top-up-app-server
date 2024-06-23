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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const result = yield auth_service_1.AuthService.create(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully registation complete',
        data: result,
    });
}));
const createadmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const result = yield auth_service_1.AuthService.createAdmin(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin create success',
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    // console.log(loginData);
    const result = yield auth_service_1.AuthService.login(loginData);
    // const { refreshToken } = result;
    // // set refresh token into cookie
    // const cookieOptions = {
    //   secure: config.env === 'production',
    //   httpOnly: true,
    // };
    // res.cookie('refreshToken', refreshToken, cookieOptions);
    // delete result.refreshToken
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Logged in successfull',
        data: result,
    });
    // console.log(req.body);
}));
const adminLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    // console.log(loginData);
    const result = yield auth_service_1.AuthService.adminLogin(loginData);
    // const { refreshToken } = result;
    // // set refresh token into cookie
    // const cookieOptions = {
    //   secure: config.env === 'production',
    //   httpOnly: true,
    // };
    // res.cookie('refreshToken', refreshToken, cookieOptions);
    // delete result.refreshToken
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin Logged in successfully',
        data: result,
    });
    // console.log(req.body);
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const passwordData = __rest(req.body, []);
    console.log(passwordData, user, '111111');
    const result = yield auth_service_1.AuthService.passwordChange(user, passwordData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password change successfully',
        data: result,
    });
    // console.log(req.body);
}));
const forgotPass = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.forgotPass(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Check your email!',
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || '';
    // console.log(token, req.body);
    // return;
    yield auth_service_1.AuthService.resetPassword(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Account recovered!',
    });
}));
exports.AuthController = {
    create,
    createadmin,
    login,
    adminLogin,
    changePassword,
    forgotPass,
    resetPassword,
};