import { Document } from 'mongoose';

export type Gender = 'male' | 'female' | 'other';

export interface UserPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string | Date;
  gender: Gender;
}

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
}
