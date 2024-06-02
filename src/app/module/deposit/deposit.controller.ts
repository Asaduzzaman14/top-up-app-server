import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Services } from './deposit.service';

// update By Id
const createDeposit = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = req.body;
  console.log(user, data);

  const result = await Services.DepostiRequest(data, user!._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deposit request successfull',
    data: result,
  });
});

// update By Id // approve // reject
const updateData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await Services.updateDataById(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Deposit successfully Update to ${result.status}`,
    data: result,
  });
});

//  get All
const getAllUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user);

  const result = await Services.getDepositData(user!.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deposit Retrieved Succesfully',
    data: result,
  });
});
//  get All
const getAlldataForAdmin = catchAsync(async (req: Request, res: Response) => {
  console.log('asas');

  const result = await Services.getAllAdminData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Deposit Retrieved Succesfully',
    data: result,
  });
});

export const Controller = {
  createDeposit,
  getAllUserProfile,
  updateData,
  getAlldataForAdmin,
};
