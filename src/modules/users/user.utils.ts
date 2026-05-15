import { Gender, UserDocument, UserPayload, UserResponse } from './user.interface';
import { ALLOWED_GENDERS } from './user.constants';

export function normalizeGender(value: unknown): Gender {
  if (typeof value !== 'string') {
    return 'other';
  }

  const normalized = value.trim().toLowerCase();
  if (ALLOWED_GENDERS.includes(normalized as Gender)) {
    return normalized as Gender;
  }

  return 'other';
}

export function buildUserResponse(user: UserDocument): UserResponse {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function validateUserPayload(data: Partial<UserPayload>): string[] {
  const errors: string[] = [];

  if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length < 2) {
    errors.push('firstName is required and must be at least 2 characters');
  }

  if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length < 2) {
    errors.push('lastName is required and must be at least 2 characters');
  }

  if (!data.dateOfBirth) {
    errors.push('dateOfBirth is required');
  } else {
    const date = typeof data.dateOfBirth === 'string' ? new Date(data.dateOfBirth) : data.dateOfBirth;
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      errors.push('dateOfBirth must be a valid date');
    } else if (date > new Date()) {
      errors.push('dateOfBirth cannot be in the future');
    }
  }

  if (!data.gender || typeof data.gender !== 'string' || !ALLOWED_GENDERS.includes(data.gender as Gender)) {
    errors.push('gender is required and must be male, female, or other');
  }

  return errors;
}
