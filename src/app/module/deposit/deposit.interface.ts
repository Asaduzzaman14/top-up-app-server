/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { UserModal } from '../auth/auth.interface';

export type IDeposit = {
  userId: Types.ObjectId | UserModal;
  status: 'pending' | 'approved' | 'rejected';
  amount: string;
  phone: string;
  trxId: string;
};

export type DepositModal = Model<IDeposit>;
