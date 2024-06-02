import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './deposit.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.USER), Controller.getAllUserProfile);

router.get('/admin', auth(ENUM_USER_ROLE.ADMIN), Controller.getAllUserProfile);

router.get('/', auth(ENUM_USER_ROLE.USER), Controller.getAllUserProfile);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.updateData);

// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

export const DepositRoutes = router;
