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
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

    amount: {
      type: String,
      required: [true, 'amount is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    trxId: {
      type: String,
      required: [true, 'trxId is required'],
    },
  },
  { timestamps: true }
);

export const Deposit = model<IDeposit, DepositModal>('deposits', orderSchema);
