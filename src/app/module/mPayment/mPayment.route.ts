import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './mPayment.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.ADMIN), Controller.create);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  Controller.getAlldata
);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.updateData);

// router.get('/:id', Controller.getDataById);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

export const MPaymentRoute = router;
