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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const auth_model_1 = require("./auth.model");
const sendResetMail_1 = require("./sendResetMail");
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    // set role
    user.role = 'user';
    // Find existing user by email
    const existingUser = yield auth_model_1.User.findOne({ email: user.email });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exists');
    }
    const newUser = yield auth_model_1.User.create(user);
    if (!newUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Register');
    }
    const { email, role, _id } = newUser;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role, _id }, config_1.default.jwt_access_secret, config_1.default.secret_expires_in);
    return { accessToken };
});
const createAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    // set role
    user.role = 'admin';
    const newUser = yield auth_model_1.User.create(user);
    if (!newUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Register');
    }
    const { email, role, _id } = newUser;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role, _id }, config_1.default.jwt_access_secret, config_1.default.secret_expires_in);
    return { accessToken };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    // check
    const isUserExist = yield auth_model_1.User.isUserExist(userEmail);
    console.log(isUserExist, 'isUserExist');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not found');
    }
    if (isUserExist.role == 'admin') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Access denied: User only');
    }
    // console.log(password, isUserExist.password);
    const _id = isUserExist._id.toString();
    if (isUserExist.password &&
        !(yield auth_model_1.User.isPasswordMatch(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'password is incorrect');
    }
    const { email, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role, _id }, config_1.default.jwt_access_secret, config_1.default.secret_expires_in);
    return {
        accessToken,
    };
});
const adminLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    // check
    const isUserExist = yield auth_model_1.User.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not found');
    }
    if (isUserExist.role != 'admin') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Access denied: Admins only');
    }
    const _id = isUserExist._id.toString();
    if (isUserExist.password &&
        !(yield auth_model_1.User.isPasswordMatch(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'password is incorrect');
    }
    const { email, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role, _id }, config_1.default.jwt_access_secret, config_1.default.secret_expires_in);
    return {
        accessToken,
    };
});
const passwordChange = (user, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = paylode;
    // Step 1 -> checking is user exist
    // alternative way to change password
    console.log(user);
    const isUserExist = yield auth_model_1.User.findOne({ _id: user === null || user === void 0 ? void 0 : user._id }).select('+password');
    console.log(isUserExist, 'this is user');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //  Step 2 -> checking old password
    if (isUserExist.password &&
        !(yield auth_model_1.User.isPasswordMatch(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
    }
    isUserExist.password = newPassword;
    // update password using save method
    isUserExist.save();
});
const forgotPass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({ email: payload.email }, { email: 1, role: 1, name: 1 });
    console.log(user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist!');
    }
    const passResetToken = yield jwtHelpers_1.jwtHelpers.createResetToken({ id: user.id }, config_1.default.jwt_access_secret, '50m');
    const resetLink = config_1.default.resetlink + `token=${passResetToken}`;
    yield (0, sendResetMail_1.sendEmail)(user.email, `
      <div>
        <p>Hi, ${user.name}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `);
    // return {
    //   message: "Check your email!"
    // }
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = payload;
    const user = yield auth_model_1.User.findOne({ email }, { id: 1 });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    const isVarified = yield jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt_access_secret);
    console.log(isVarified);
    const password = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_solt_rounds));
    console.log(password);
    yield auth_model_1.User.updateOne({ email }, { password });
});
exports.AuthService = {
    create,
    createAdmin,
    login,
    adminLogin,
    passwordChange,
    forgotPass,
    resetPassword,
};
