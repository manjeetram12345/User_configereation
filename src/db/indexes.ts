import { UserModel } from '../modules/users/user.schema';

export async function initMongoIndexes(): Promise<void> {
  await UserModel.createIndexes();
  console.log('MongoDB indexes initialized');
}
