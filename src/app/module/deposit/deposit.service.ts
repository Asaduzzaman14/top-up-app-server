import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../auth/auth.model';
import { IDeposit } from './deposit.interface';
import { Deposit } from './deposit.models';

const DepostiRequest = async (
  data: IDeposit,
  user: any
): Promise<IDeposit | null> => {
  data.userId = user._id;

  const result = await Deposit.create(data);
  console.log(result);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Deposit request');
  }

  return result;
};

const updateDataById = async (
  id: string,
  payload: IDeposit
): Promise<IDeposit | null> => {
  const user = await User.findById(id);

  // If the user is not found, return null or throw an error
  if (!user) {
    console.log('User not found');
    return null;
  }

  // Update the user's wallet balance
  user.wallet = (Number(user.wallet) + Number(payload.amount)).toString();
  await user.save();

  // Update the deposit record and return the updated document
  const result = await Deposit.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getDepositData = async (id: string): Promise<IDeposit | null> => {
  const result = await Deposit.findById({ id });
  return result;
};

const getAllAdminData = async (): Promise<IDeposit[]> => {
  const result = await Deposit.find({});
  return result;
};

export const Services = {
  DepostiRequest,
  updateDataById,
  getDepositData,
  getAllAdminData,
};
