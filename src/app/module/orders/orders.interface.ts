/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { UserModal } from '../auth/auth.interface';

export type IOrder = {
  _id: string;
  userId: Types.ObjectId | UserModal;
  productName: string;
  img: string;
  price: string;
  diamond: string;
  playerId: string;
  orderNumber: number;
  status: 'pending' | 'complete' | 'rejected';
};

export type OrderModal = Model<IOrder>;
