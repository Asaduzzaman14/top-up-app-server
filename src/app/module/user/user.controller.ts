import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Services } from './user.service';

// update By Id
const updateData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await Services.updateDataById(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order successfully updated',
    data: result,
  });
});

// // Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.deleteData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted Successfully',
    data: result,
  });
});

//  get All
const getAllUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await Services.getProfileData(user!._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Retrieved Succesfully',
    data: result,
  });
});
//  get All
const getAlldataForAdmin = catchAsync(async (req: Request, res: Response) => {
 

  const result = await Services.getAllAdminData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User Retrieved Succesfully',
    data: result,
  });
});

export const Controller = {
  getAllUserProfile,
  updateData,
  deleteData,
  getAlldataForAdmin,
};
