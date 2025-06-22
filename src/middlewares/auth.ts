import { NextFunction, Request, Response } from 'express';

const MOCK_USER_ID = '6857f272ae83db7109096071';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: MOCK_USER_ID,
  };

  next();
};
