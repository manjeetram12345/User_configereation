import { Request, Response, NextFunction } from 'express';
import { buildUserResponse, validateUserPayload } from './user.utils';
import { createUserProfile, getUserProfile, updateUserProfile, searchUsers } from './user.service';

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validateUserPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await createUserProfile(req.body);
    res.status(201).json(buildUserResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function getUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserProfile(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(buildUserResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await updateUserProfile(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(buildUserResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function listUsersHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const query = String(req.query.q ?? '');
    const limit = Number(req.query.limit ?? 20);
    const offset = Number(req.query.offset ?? 0);
    const users = await searchUsers(query, limit, offset);
    res.json(users.map(buildUserResponse));
  } catch (error) {
    next(error);
  }
}
