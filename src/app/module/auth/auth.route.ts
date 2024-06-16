import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validations';

const router = express.Router();

router.post(
  '/login',
  // validateRequest(AuthValidation.authValidationZodSchema),
  AuthController.login
);

router.post(
  '/admin/login',
  // validateRequest(AuthValidation.authValidationZodSchema),
  AuthController.adminLogin
);

router.post(
  '/register',
  validateRequest(AuthValidation.authValidationZodSchema),
  AuthController.create
);

router.post(
  '/create-admin',
  // auth(ENUM_USER_ROLE.ADMIN),
  AuthController.createadmin
);

router.post('/change-password', auth(), AuthController.changePassword);

export const AuthRoutes = router;
