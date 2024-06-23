"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const banner_route_1 = require("../module/banner/banner.route");
const catagorys_route_1 = require("../module/catagorys/catagorys.route");
const deposit_route_1 = require("../module/deposit/deposit.route");
const mPayment_route_1 = require("../module/mPayment/mPayment.route");
const notice_route_1 = require("../module/notice/notice.route");
const orders_route_1 = require("../module/orders/orders.route");
const payment_route_1 = require("../module/payment/payment.route");
const products_route_1 = require("../module/products/products.route");
const user_route_1 = require("../module/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/user',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/banners',
        routes: banner_route_1.BannerRoutes,
    },
    {
        path: '/categorys',
        routes: catagorys_route_1.CatagoryRoute,
    },
    {
        path: '/products',
        routes: products_route_1.ProductsRoute,
    },
    {
        path: '/deposit',
        routes: deposit_route_1.DepositRoutes,
    },
    {
        path: '/orders',
        routes: orders_route_1.OrderRoutes,
    },
    {
        path: '/payment',
        routes: payment_route_1.PaymentRoute,
    },
    {
        path: '/manually-payment',
        routes: mPayment_route_1.MPaymentRoute,
    },
    {
        path: '/notice',
        routes: notice_route_1.NoticeRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
