import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Products } from '../products/products.models';
import { ICategory } from './catagorys.interface';
import { Category } from './catagorys.models';
import { getCategoriesWithProducts } from './catagorys.utils';

const create = async (data: ICategory): Promise<ICategory | null> => {
  const newCustomer = await Category.create(data);
  if (!newCustomer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Catagory');
  }

  return newCustomer;
};

const getAllData = async (): Promise<ICategory[]> => {
  const result = await getCategoriesWithProducts();
  return result;
};

const getSingleData = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: ICategory
): Promise<ICategory | null> => {
  
  const result = await Category.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<ICategory | null> => {

    // Delete all products associated with the category
      await Products.deleteMany({ categoryId: id });

    // Delete the category
    const result = await Category.findByIdAndDelete(id);

  return result;
};


// for admin
const getAllDataFOrAdmin = async (): Promise<ICategory[]> => {
  const result = await  Category.find({})
  return result;
};


export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
  getAllDataFOrAdmin
};
