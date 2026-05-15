import { FilterQuery } from 'mongoose';
import { UserDocument } from './user.interface';
import { UserModel } from './user.schema';

export async function createUser(data: Partial<UserDocument>): Promise<UserDocument> {
  const user = new UserModel(data);
  return user.save();
}

export async function getUserById(id: string): Promise<UserDocument | null> {
  return UserModel.findById(id).exec();
}

export async function updateUser(id: string, update: Partial<UserDocument>): Promise<UserDocument | null> {
  return UserModel.findByIdAndUpdate(id, update, { new: true }).exec();
}

export async function listUsers(filter: FilterQuery<UserDocument> = {}, limit = 20, offset = 0): Promise<UserDocument[]> {
  return UserModel.find(filter).skip(offset).limit(limit).sort({ createdAt: -1 }).exec();
}
