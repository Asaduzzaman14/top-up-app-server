import { Schema, Types, model } from 'mongoose';
import { IProduct, ProductModel } from './products.interface';

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    img: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    catagoryId: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: String,
      required: [true, 'price is required'],
    },
  },
  { timestamps: true }
);

export const Products = model<IProduct, ProductModel>(
  'products',
  productSchema
);
