import { Schema, Types, model } from 'mongoose';
import { IOrder, OrderModal } from './orders.interface';

const orderSchema = new Schema<IOrder, OrderModal>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: [true, 'userId is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'complete', 'rejected'],
      default: 'pending',
    },
    // img: {
    //   type: String,
    //   required: [true, 'img is required'],
    // },
    price: {
      type: String,
      required: [true, 'price is required'],
    },
    productName: {
      type: String,
      required: [true, 'productName is required'],
    },
    playerId: {
      type: String,
      required: [true, 'playerId is required'],
    },
    orderNumber: {
      type: Number,
      required: [true, 'orderNumber is required'],
      unique: true,
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder, OrderModal>('orders', orderSchema);
