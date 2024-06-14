import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPayment } from './payment.interface';
import { Payments } from './payment.models';

const create = async (data: IPayment, id: any): Promise<IPayment | null> => {
  console.log(data, id);
  const newProduct = await Payments.create(data);

  if (!newProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add deposit method');
  }

  return newProduct;
};

const getAllData = async (): Promise<IPayment[]> => {
  const result = await Payments.find({});
  return result;
};

const getSingleData = async (id: string): Promise<IPayment | null> => {
  const result = await Payments.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: IPayment
): Promise<IPayment | null> => {
  const result = await Payments.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IPayment | null> => {
  const result = await Payments.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
