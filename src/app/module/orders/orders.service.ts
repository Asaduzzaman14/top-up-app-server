import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { UserModal } from '../auth/auth.interface';
import { User } from '../auth/auth.model';
import { Products } from '../products/products.models';
import { IOrder } from './orders.interface';
import { Order } from './orders.models';

export type IOrderType = {
  _id: string;
  userId: Types.ObjectId | UserModal;
  productName: string;
  price: string;
  diamond: string;
  catagoryName: string;
  playerId: string;
  productId: string;
  orderNumber: number;
  status: boolean;
};

const create = async (data: IOrderType, user: any): Promise<IOrder | null> => {
  const userId = user._id;
  // Function to get the next order number
  const getNextOrderNumber = async (): Promise<number> => {
    const latestOrder = await Order.findOne().sort({ createdAt: -1 }).exec();
    return latestOrder ? latestOrder.orderNumber + 1 : 1;
  };

  // eslint-disable-next-line no-useless-catch
  try {
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

    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update the user's wallet
      await User.updateOne({ _id: userId }, { wallet: newWallet }, { session });

      // Get the next order number
      const orderNumber = await getNextOrderNumber();

      const orderData = {
        userId: userId,
        productName: product.name,
        price: product.price,
        playerId: data.playerId,
        orderNumber: orderNumber,
      };
      // Create the order
      const result = await Order.create([orderData], { session });

      await session.commitTransaction();
      session.endSession();

      return result[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create order'
      );
    }
  } catch (error) {
    throw error;
  }
};

const getAllData = async (userId: string): Promise<IOrder[] | null> => {
  const result = await Order.find({ userId });
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IOrder
): Promise<IOrder | null> => {
  if (paylode.status == 'rejected') {
    console.log(paylode);

    const user = await User.findById({ _id: paylode.userId });
    console.log(user);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
    }
    const newWaller = Number(user?.wallet) + Number(paylode.price);
    const id = paylode.userId;
    const payload = {
      wallet: newWaller,
    };
    await User.findByIdAndUpdate({ _id: id }, payload);
  }

  const data = {
    status: paylode.status,
  };

  const result = await Order.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const getAllAdminData = async (): Promise<IOrder[] | null> => {
  const result = await Order.find({}).populate('userId');
  return result;
};

const getWeeklySell = async () => {
  const orders = await Order.aggregate([
    {
      $addFields: {
        price: { $toDouble: '$price' }, // Convert price to double
      },
    },
    {
      $group: {
        _id: {
          isoWeek: { $isoWeek: '$date' },
          year: { $year: '$date' },
        },
        totalSales: { $sum: '$price' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.isoWeek': 1 },
    },
  ]);
  return orders;
};

export const Services = {
  create,
  getAllData,
  updateDataById,
  deleteData,
  getAllAdminData,
  getWeeklySell,
};
