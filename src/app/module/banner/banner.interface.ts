/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IBanner = {
  id: string;
  img: string;
};

export type BannerModal = Model<IBanner>;
