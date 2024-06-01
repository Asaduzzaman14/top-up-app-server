/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ICategory } from '../catagorys/catagorys.interface';

export type IProduct = {
  name: string;
  img?: string;
  description: string;
  price: string;
  diamond: string;
  catagoryId: Types.ObjectId | ICategory;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
