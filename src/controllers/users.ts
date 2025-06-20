import { NextFunction, Request, Response } from 'express';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export const getUserById = async (req: Request, res: Response) => {};

export const createUser = async (req: Request, res: Response) => {};

export const updateUserInfo = async (req: Request, res: Response) => {};

export const updateUserAvatar = async (req: Request, res: Response) => {};
