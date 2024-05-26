/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id: string;
  name: string;
  password: string;
  role: string;
  img: string;
  wallet: string;
  phone: string;
  email: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IloginResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IChagePassword = {
  oldPassword: string;
  newPassword: string;
};

export type UserModal = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'role' | 'phone' | 'email' | 'password'>>;

  isPasswordMatch(
    providedPassword: string,
    currentPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
