import { model, Schema } from 'mongoose';
import { UserDocument } from './user.interface';

const UserSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'], default: 'other' },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>('User', UserSchema);
