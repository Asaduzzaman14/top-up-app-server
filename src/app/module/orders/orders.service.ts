import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Products } from '../products/products.models';
import { IOrder } from './orders.interface';
import { Order } from './orders.models';

const create = async (data: IOrder, user: any): Promise<IOrder | null> => {
  const orderData = {
    userId: user._id,
    productId: data.productId,
  };

  const product = await Products.findById(data.productId);
  console.log(product);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not Found');
  }

  const result = await Order.create(orderData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Post Order');
  }

  return result;
};

const getSingleData = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IOrder
): Promise<IOrder | null> => {
  const result = await Order.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const getAllData = async (): Promise<IOrder[]> => {
  const result = await Order.find({}).populate('productId');
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
