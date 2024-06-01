/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type ICategory = {
  name: string;
  img?: string;
  description: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
