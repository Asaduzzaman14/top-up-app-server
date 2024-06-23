"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), orders_controller_1.Controller.create);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), orders_controller_1.Controller.updateData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), orders_controller_1.Controller.deleteData);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), orders_controller_1.Controller.getAlldata);
router.get('/admin', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), orders_controller_1.Controller.getAlldataForAdmin);
router.get('/graph', orders_controller_1.Controller.getAllGraphData);
exports.OrderRoutes = router;
