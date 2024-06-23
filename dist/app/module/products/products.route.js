"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post('/', products_controller_1.Controller.create);
router.get('/:id', products_controller_1.Controller.getDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), products_controller_1.Controller.updateData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), products_controller_1.Controller.deleteData);
router.get('/', products_controller_1.Controller.getAlldata);
exports.ProductsRoute = router;
