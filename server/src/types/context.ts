import { Request, Response } from 'express';
import User from '../schema/User/user.schema';

interface Context {
  req: Request;
  res: Response;
  user: User;
}

export default Context;
