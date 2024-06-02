import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './orders.interface';
import { Order } from './orders.models';

const create = async (data: IOrder, user: any): Promise<IOrder | null> => {
  const id = user._id;
  console.log(id);

  const orderData = {
    userId: user._id,
    productId: data.productId,
  };

  const result = await Order.create(orderData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Post Order');
  }

  return result;
};

const getAllData = async (userId: string): Promise<IOrder[] | null> => {
  const result = await Order.find({ userId }).populate('productId');
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

const getAllAdminData = async (): Promise<IOrder[] | null> => {
  const result = await Order.find().populate('productId');
  return result;
};

export const Services = {
  create,
  getAllData,
  updateDataById,
  deleteData,
  getAllAdminData,
};
