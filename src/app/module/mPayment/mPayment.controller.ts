import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IMPayment } from './mPayment.interface';
import { Services } from './mPayment.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result = await Services.create(data);

    sendResponse<IMPayment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'payment method add Success',
      data: result,
    });
  }
);

//  get All Order

const getAlldata = catchAsync(async (req: Request, res: Response) => {
  const result = await Services.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Method Retrieved  Succesfully',
    data: result,
  });
});

// // update Parts By Id
const updateData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log(id, updateData);
  const result = await Services.updateDataById(id, updatedData);

  sendResponse<IMPayment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'payment method successfully updated',
    data: result,
  });
});

// // Delete Parts
const deleteData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await Services.deleteData(id);

  sendResponse<IMPayment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Method deleted Successfully',
    data: result,
  });
});

export const Controller = {
  create,
  getAlldata,
  updateData,
  deleteData,
};
