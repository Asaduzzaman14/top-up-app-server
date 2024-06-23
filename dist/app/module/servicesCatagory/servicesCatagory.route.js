"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesCatagoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const servicesCatagory_controller_1 = require("./servicesCatagory.controller");
const router = express_1.default.Router();
router.post('/', servicesCatagory_controller_1.Controller.create);
router.get('/:id', servicesCatagory_controller_1.Controller.getDataById);
router.patch('/:id', servicesCatagory_controller_1.Controller.updateData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), servicesCatagory_controller_1.Controller.deleteData);
router.get('/', servicesCatagory_controller_1.Controller.getAlldata);
exports.ServicesCatagoryRoute = router;
