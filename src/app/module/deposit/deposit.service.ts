import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from '../auth/auth.model';
import { IDeposit } from './deposit.interface';
import { Deposit } from './deposit.models';

const DepostiRequest = async (
  data: IDeposit,
  userId: any
): Promise<IDeposit | null> => {
  console.log(data, 'adfsdf');

  data.userId = userId;

  const result = await Deposit.create(data);

  if (data.status === 'completed') {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User wallet not found');
    }

    // Update the user's wallet balance
    const userWallet = Number(user.wallet) + Number(data.amount);

    const walletData = {
      wallet: userWallet,
    };

    await User.findByIdAndUpdate({ _id: userId }, walletData, {
      new: true,
    });
  }

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Deposit request');
  }

  return result;
};

const updateDataById = async (
  id: string,
  payload: IDeposit
): Promise<IDeposit | any> => {
  const depositRequest = await Deposit.findById(id);
  console.log(depositRequest);

  if (!depositRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deposit Request not found');
  }

  if (depositRequest.status != 'pending') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Deposit Request Already Updated'
    );
  }

  if (payload.status === 'completed') {
    const user = await User.findById(depositRequest.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User wallet not found');
    }

    // Update the user's wallet balance
    const userWallet = Number(user.wallet) + Number(depositRequest.amount);

    const walletData = {
      wallet: userWallet,
    };

    await User.findByIdAndUpdate({ _id: depositRequest.userId }, walletData, {
      new: true,
    });
  }

  const result = await Deposit.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getDepositData = async (
  userId: string
): Promise<IDeposit | any | null> => {
  try {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }

    const result = await Deposit.find({ userId });

    return result;
  } catch (error) {
    return null;
  }
};

const getAllAdminData = async (): Promise<IDeposit[]> => {
  console.log('adad');

  const result = await Deposit.find({}).populate('userId');
  return result;
};

const deleteData = async (id: string): Promise<IDeposit | null> => {
  const result = await Deposit.findByIdAndDelete(id);
  return result;
};

export const Services = {
  DepostiRequest,
  updateDataById,
  getDepositData,
  getAllAdminData,
  deleteData,
};
