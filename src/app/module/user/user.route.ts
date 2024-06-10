import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './user.controller';

const router = express.Router();

router.get('/admin', auth(ENUM_USER_ROLE.ADMIN), Controller.getAlldataForAdmin);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  Controller.getAllUserProfile
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  Controller.updateData
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

export const UserRoutes = router;
