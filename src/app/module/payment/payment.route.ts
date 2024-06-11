import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './payment.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.USER), Controller.create);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), Controller.getAlldata);

// router.get('/:id', Controller.getDataById);

// router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.updateData);

// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

export const PaymentRoute = router;
