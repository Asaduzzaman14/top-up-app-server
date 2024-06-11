/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';

export type IPayment = {
  apiKey: string;
  pannelUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: Types.ObjectId | IUser;
};

export type PaymentModel = Model<IPayment, Record<string, unknown>>;
