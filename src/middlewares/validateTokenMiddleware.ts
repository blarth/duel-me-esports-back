
import * as userRepository from "../repositories/userRepository.js";
import { NextFunction, Request, Response } from 'express';
import * as error from "../utils/errorUtils.js"

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if(!token) throw error.unauthorizedError("Token is required");
  const {userId} = await userRepository.findUniqueByToken(token);
  if(!userId) throw error.unauthorizedError("Token is invalid");
  
    res.locals.userId = userId ;
  next()
}
 