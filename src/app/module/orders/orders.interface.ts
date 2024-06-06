/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { UserModal } from '../auth/auth.interface';
import { ProductModel } from '../products/products.interface';

export type IOrder = {
  _id: string;
  userId: Types.ObjectId | UserModal;
  productId: Types.ObjectId | ProductModel;
  playerId: string;
  status: boolean;
};

export type OrderModal = Model<IOrder>;
