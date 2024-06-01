import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProduct } from './products.interface';
import { Products } from './products.models';

const create = async (data: IProduct): Promise<IProduct | null> => {
  console.log(data);

  const newCustomer = await Products.create(data);
  if (!newCustomer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Catagory');
  }

  return newCustomer;
};

const getAllData = async (): Promise<IProduct[]> => {
  const result = await Products.find({});
  return result;
};

const getSingleData = async (id: string): Promise<IProduct | null> => {
  const result = await Products.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IProduct
): Promise<IProduct | null> => {
  const result = await Products.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IProduct | null> => {
  const result = await Products.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
