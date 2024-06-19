import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
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

router.post(
  '/change-password',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AuthController.changePassword
);

router.post('/forgot-password', AuthController.forgotPass);

export const AuthRoutes = router;
