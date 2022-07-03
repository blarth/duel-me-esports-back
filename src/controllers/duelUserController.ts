import { Request, Response } from "express";
import * as duelUserService from '../services/duelUserService.js'

export async function findAllGivenId(req: Request, res: Response){
  const {userId} = res.locals
  const duels = await duelUserService.findAllGivenId(userId)
  res.send(duels)
}