import { Schema, Types, model } from 'mongoose';
import { DepositModal, IDeposit } from './deposit.interface';

const orderSchema = new Schema<IDeposit, DepositModal>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: [true, 'userId is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'rejected'],
      required: [true, 'status is required'],
    },
    amount: {
      type: String,
      required: [true, 'amount is required'],
    },
    method: {
      type: String,
      required: [true, 'method is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    trxId: {
      type: String,
      required: [true, 'trxId is required'],
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Deposit = model<IDeposit, DepositModal>('deposits', orderSchema);
