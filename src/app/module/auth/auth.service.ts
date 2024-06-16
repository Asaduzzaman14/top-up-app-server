import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IChagePassword,
  ILogin,
  IUser,
  IloginResponse,
} from './auth.interface';
import { User } from './auth.model';

const create = async (user: IUser): Promise<IloginResponse> => {
  console.log(user);
  // set role
  user.role = 'user';

  // Find existing user by email
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Register');
  }
  const { email, role, _id } = newUser;

  const accessToken = jwtHelpers.createToken(
    { email, role, _id },
    config.jwt_access_secret as Secret,
    config.secret_expires_in as string
  );

  return { accessToken };
};

const createAdmin = async (user: IUser): Promise<IloginResponse> => {
  console.log(user);
  // set role
  user.role = 'admin';

  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Register');
  }
  const { email, role, _id } = newUser;

  const accessToken = jwtHelpers.createToken(
    { email, role, _id },
    config.jwt_access_secret as Secret,
    config.secret_expires_in as string
  );

  return { accessToken };
};

const login = async (payload: ILogin): Promise<IloginResponse> => {
  const { email: userEmail, password } = payload;

  // check

  const isUserExist = await User.isUserExist(userEmail);
  console.log(isUserExist, 'isUserExist');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  if (isUserExist.role == 'admin') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Access denied: User only');
  }

  // console.log(password, isUserExist.password);
  const _id = isUserExist._id.toString();

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }
  const { email, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email, role, _id },
    config.jwt_access_secret as Secret,
    config.secret_expires_in as string
  );

  return {
    accessToken,
  };
};

const adminLogin = async (payload: ILogin): Promise<IloginResponse> => {
  const { email: userEmail, password } = payload;

  // check

  const isUserExist = await User.isUserExist(userEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  if (isUserExist.role != 'admin') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Access denied: Admins only');
  }

  const _id = isUserExist._id.toString();

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }
  const { email, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email, role, _id },
    config.jwt_access_secret as Secret,
    config.secret_expires_in as string
  );

  return {
    accessToken,
  };
};

const passwordChange = async (
  user: JwtPayload | null,
  paylode: IChagePassword
): Promise<void> => {
  const { oldPassword, newPassword } = paylode;

  // Step 1 -> checking is user exist
  // alternative way to change password
  console.log(user);

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist, 'this is user');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //  Step 2 -> checking old password

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  isUserExist.password = newPassword;

  // update password using save method
  isUserExist.save();
};

const refreshToken = async (token: string): Promise<any> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  const { userId } = verifiedToken;

  // // user deleted fromd database then have refresh token
  // // checking deleted user
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not exist');
  }

  // genatate new token

  const newAccessToken = jwtHelpers.createToken(
    { email: isUserExist.email, password: isUserExist.password },
    config.jwt_access_secret as Secret,
    config.secret_expires_in as string
  );
  console.log(newAccessToken, 'new AccessToken');

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  create,
  createAdmin,
  login,
  adminLogin,
  passwordChange,
  refreshToken,
};
