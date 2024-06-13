import { Model } from 'mongoose';

export type IMPayment = {
  paymentName: string;
  number: string;
  img: string;
  status: 'active' | 'inactive';
};

export type MPaymentModel = Model<IMPayment, Record<string, unknown>>;
