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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const auth = (...requiredRoles) => (req, Response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(requiredRoles);
        // get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        // verified token
        let verifyUser = null;
        try {
            verifyUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt_access_secret);
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Token');
        }
        req.user = verifyUser; // role, userId
        // console.log(verifyUser, '111111');
        if (requiredRoles.length && !requiredRoles.includes(verifyUser.role)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
