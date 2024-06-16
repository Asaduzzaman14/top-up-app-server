/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IBanner = {
  id: string;
  img: string;
  url: string;
};

export type BannerModal = Model<IBanner>;
