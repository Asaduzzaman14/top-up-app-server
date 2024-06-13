import { Schema, model } from 'mongoose';
import { IPayment, PaymentModel } from './payment.interface';

const productSchema = new Schema<IPayment, PaymentModel>(
  {
    apiKey: {
      type: String,
      required: [true, 'apiKey is required'],
    },
    pannelUrl: {
      type: String,
      required: [true, 'apiKey is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Payments = model<IPayment, PaymentModel>('payment', productSchema);
