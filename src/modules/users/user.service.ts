import { UserPayload, UserDocument } from './user.interface';
import { getUserById, createUser, updateUser, listUsers } from './user.repository';
import { normalizeGender } from './user.utils';

export async function createUserProfile(data: UserPayload): Promise<UserDocument> {
  return createUser({
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    dateOfBirth: new Date(data.dateOfBirth),
    gender: normalizeGender(data.gender),
  });
}

export async function getUserProfile(id: string): Promise<UserDocument | null> {
  return getUserById(id);
}

export async function updateUserProfile(id: string, update: Partial<UserPayload>): Promise<UserDocument | null> {
  const payload: Partial<UserDocument> = {};

  if (update.firstName) {
    payload.firstName = update.firstName.trim();
  }

  if (update.lastName) {
    payload.lastName = update.lastName.trim();
  }

  if (update.gender) {
    payload.gender = normalizeGender(update.gender);
  }

  if (update.dateOfBirth) {
    payload.dateOfBirth = new Date(update.dateOfBirth);
  }

  return updateUser(id, payload);
}

export async function searchUsers(query: string, limit = 20, offset = 0): Promise<UserDocument[]> {
  const filter = query
    ? {
        $or: [
          { firstName: new RegExp(query, 'i') },
          { lastName: new RegExp(query, 'i') },
        ],
      }
    : {};

  return listUsers(filter, limit, offset);
}
