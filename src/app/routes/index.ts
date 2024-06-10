import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { BannerRoutes } from '../module/banner/banner.route';
import { CatagoryRoute } from '../module/catagorys/catagorys.route';
import { DepositRoutes } from '../module/deposit/deposit.route';
import { OrderRoutes } from '../module/orders/orders.route';
import { PaymentRoute } from '../module/payment/payment.route';
import { ProductsRoute } from '../module/products/products.route';
import { UserRoutes } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/user',
    routes: UserRoutes,
  },
  {
    path: '/banners',
    routes: BannerRoutes,
  },
  {
    path: '/categorys',
    routes: CatagoryRoute,
  },
  {
    path: '/products',
    routes: ProductsRoute,
  },

  {
    path: '/deposit',
    routes: DepositRoutes,
  },
  {
    path: '/orders',
    routes: OrderRoutes,
  },
  {
    path: '/payment',
    routes: PaymentRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
