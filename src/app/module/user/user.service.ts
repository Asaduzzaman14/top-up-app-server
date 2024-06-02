import { IUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';

const updateDataById = async (
  id: string,
  paylode: IUser
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const deleteData = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const getProfileData = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
const getAllAdminData = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

export const Services = {
  updateDataById,
  deleteData,
  getProfileData,
  getAllAdminData,
};
