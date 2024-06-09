import { Schema, Types, model } from 'mongoose';
import { IOrder, OrderModal } from './orders.interface';

const orderSchema = new Schema<IOrder, OrderModal>(
  {
    productId: {
      type: Types.ObjectId,
      ref: 'products',
      required: [true, 'Product Id is required'],
    },
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: [true, 'userId is required'],
    },
    status: {
      type: Boolean,
      default: false,
    },
    playerId: {
      type: String,
      required: [true, 'playerId is required'],
    },
    orderNumber: {
      type: Number,
      required: [true, 'orderNumber is required'],
       unique:true
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder, OrderModal>('orders', orderSchema);
