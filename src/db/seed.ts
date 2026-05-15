import dotenv from 'dotenv';
import { connectMongo } from './mongoose';
import { UserModel } from '../modules/users/user.schema';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/user_configuration';

async function seed(): Promise<void> {
  await connectMongo(MONGODB_URI);

  const count = await UserModel.countDocuments();
  if (count > 0) {
    console.log('Seed skipped: users already exist');
    return;
  }

  await UserModel.create({
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: new Date('1990-01-15'),
    gender: 'female',
  });

  console.log('Seed completed: default user created');
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
