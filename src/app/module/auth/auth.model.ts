import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModal } from './auth.interface';

const adminSchema = new Schema<IUser, UserModal>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    role: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
    },
    wallet: {
      type: String,
      default: '0',
    },
    img: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: 0,
    },
  },
  { timestamps: true }
);

adminSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'role' | 'phone' | 'email' | 'password'> | null> {
  const user = await User.findOne(
    { email },
    { email: 1, role: 1, password: 1 }
  );

  return user;
};

adminSchema.statics.isPasswordMatch = async function (
  providedPassword: string,
  previewsPass: string
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, previewsPass);
};

// hashing password before save document
// user.create() // user.save()

export const User = model<IUser, UserModal>('users', adminSchema);
