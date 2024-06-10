import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './orders.interface';
import { Services } from './orders.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const user = req.user;

    const result = await Services.create(data, user);
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully  Order complete',
      data: result,
    });
  }
);

// // update By Id
const updateData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log(id, updateData);

  const result = await Services.updateDataById(id, updatedData);

  sendResponse<IOrder>(res, {
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

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted Successfully',
    data: result,
  });
});

//  get All
const getAlldata = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await Services.getAllData(user!._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Retrieved Succesfully',
    data: result,
  });
});
//  get All
const getAlldataForAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await Services.getAllAdminData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order Retrieved Succesfully',
    data: result,
  });
});

export const Controller = {
  create,
  getAlldata,
  updateData,
  deleteData,
  getAlldataForAdmin,
};
