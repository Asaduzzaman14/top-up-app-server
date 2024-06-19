import { Schema, model } from 'mongoose';
import { INotice, NoticeModal } from './notice.interface';

const noticeSchema = new Schema<INotice, NoticeModal>(
  {
    notice: {
      type: String,
      required: [true, 'notice is required'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const Notice = model<INotice, NoticeModal>('notices', noticeSchema);
