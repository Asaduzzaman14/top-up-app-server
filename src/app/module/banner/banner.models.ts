import { Schema, model } from 'mongoose';
import { BannerModal, IBanner } from './banner.interface';

const bannerSchema = new Schema<IBanner, BannerModal>(
  {
    img: {
      type: String,
      required: [true, 'image is required'],
    },
    url: {
      type: String,
      required: [true, 'url is required'],
    },
  },
  { timestamps: true }
);

export const Banner = model<IBanner, BannerModal>('banners', bannerSchema);
