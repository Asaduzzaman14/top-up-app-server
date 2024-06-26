import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IloginResponse } from './auth.interface';
import { AuthService } from './auth.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await AuthService.create(userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully registation complete',
      data: result,
    });
  }
);

const createadmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await AuthService.createAdmin(userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin create success',
      data: result,
    });
  }
);

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  // console.log(loginData);

  const result = await AuthService.login(loginData);

  // const { refreshToken } = result;

  // // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken

  sendResponse<IloginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged in successfull',
    data: result,
  });

  // console.log(req.body);
});

const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  // console.log(loginData);

  const result = await AuthService.adminLogin(loginData);

  // const { refreshToken } = result;

  // // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken

  sendResponse<IloginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Logged in successfully',
    data: result,
  });

  // console.log(req.body);
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const { ...passwordData } = req.body;

  console.log(passwordData, user, '111111');

  const result = await AuthService.passwordChange(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change successfully',
    data: result,
  });

  // console.log(req.body);
});

const forgotPass = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgotPass(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Check your email!',
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || '';

  // console.log(token, req.body);
  // return;

  await AuthService.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Account recovered!',
  });
});

export const AuthController = {
  create,
  createadmin,
  login,
  adminLogin,
  changePassword,

  forgotPass,
  resetPassword,
};
