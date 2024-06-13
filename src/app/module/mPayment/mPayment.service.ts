import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IMPayment } from './mPayment.interface';
import { Payments } from './mPayment.models';

const create = async (data: IMPayment): Promise<IMPayment | null> => {
  const newProduct = await Payments.create(data);

  if (!newProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Payment method');
  }

  return newProduct;
};

const getAllData = async (): Promise<IMPayment[]> => {
  const result = await Payments.find({});
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IMPayment
): Promise<IMPayment | null> => {
  const result = await Payments.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IMPayment | null> => {
  const result = await Payments.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  updateDataById,
  deleteData,
};
