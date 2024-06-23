"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const authValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
    }),
});
exports.AuthValidation = {
    authValidationZodSchema,
};
