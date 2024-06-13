import { Schema, model } from 'mongoose';
import { IMPayment, MPaymentModel } from './mPayment.interface';

const productSchema = new Schema<IMPayment, MPaymentModel>(
  {
    paymentName: {
      type: String,
      required: [true, 'paymentName is required'],
    },
    img: {
      type: String,
      required: [true, 'img is required'],
    },
    number: {
      type: String,
      required: [true, 'number is required'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const Payments = model<IMPayment, MPaymentModel>(
  'manualy-payment',
  productSchema
);
