import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './catagorys.interface';

const categorySchema = new Schema<ICategory, CategoryModel>(
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
  },
  { timestamps: true }
);

export const Category = model<ICategory, CategoryModel>(
  'Category',
  categorySchema
);
