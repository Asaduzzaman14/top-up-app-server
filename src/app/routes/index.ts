import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { BannerRoutes } from '../module/banner/banner.route';
import { CatagoryRoute } from '../module/catagorys/catagorys.route';
import { OrderRoutes } from '../module/orders/orders.route';
import { ProductsRoute } from '../module/products/products.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
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
    path: '/orders',
    routes: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
