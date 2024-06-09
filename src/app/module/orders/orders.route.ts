import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { Controller } from './orders.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.USER), Controller.create);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.updateData);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), Controller.deleteData);

router.get('/', auth(ENUM_USER_ROLE.USER), Controller.getAlldata);

router.get('/admin', auth(ENUM_USER_ROLE.ADMIN), Controller.getAlldataForAdmin);

export const OrderRoutes = router;
