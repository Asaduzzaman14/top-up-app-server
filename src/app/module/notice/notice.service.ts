import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { INotice } from './notice.interface';
import { Notice } from './notice.models';

const create = async (data: INotice): Promise<INotice | null> => {
  console.log(data);
  const isExist = await Notice.find({});
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Notise already exist');
  }

  const result = await Notice.create(data);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Post notice');
  }

  return result;
};

const getAllData = async (): Promise<INotice[]> => {
  const result = await Notice.find({});
  return result;
};

const getSingleData = async (id: string): Promise<INotice | null> => {
  const result = await Notice.findById(id);
  return result;
};

const updateDataById = async (
  id: string,
  paylode: INotice
): Promise<INotice | null> => {
  const result = await Notice.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<INotice | null> => {
  const result = await Notice.findByIdAndDelete(id);
  return result;
};

export const Services = {
  create,
  getAllData,
  getSingleData,
  updateDataById,
  deleteData,
};
