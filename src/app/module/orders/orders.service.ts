import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../auth/auth.model';
import { Products } from '../products/products.models';
import { IOrder } from './orders.interface';
import { Order } from './orders.models';

const create = async (data: IOrder, user: any): Promise<IOrder | null> => {
  const userId = user._id;

  // Fetch user and product details concurrently
  const [orderUser, product] = await Promise.all([
    User.findById(userId),
    Products.findById(data.productId),
  ]);

  if (!orderUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }

  const wallet = Number(orderUser.wallet);
  const price = Number(product.price);

  if (wallet < price) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient balance');
  }

  const newWallet = wallet - price;

  // Update the user's wallet
  await User.updateOne({ _id: userId }, { wallet: newWallet });

  const orderData = {
    userId: userId,
    productId: data.productId,
  };

  // Create the order
  const result = await Order.create(orderData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
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
