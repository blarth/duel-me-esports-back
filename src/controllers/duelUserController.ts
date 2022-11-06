import { Request, Response } from "express";
import * as duelUserService from '../services/duelUserService.js'

export async function findAllGivenId(_req: Request, res: Response){
  const {userId} = res.locals
  const {
    duelsUpcoming,
    duelsLost,
    duelsWon
} = await duelUserService.findAllGivenId(userId)
  res.send({
    duelsUpcoming,
    duelsLost,
    duelsWon
})
}
export async function findAll(_req: Request, res: Response){
  const duels = await duelUserService.findAll()
  res.send(duels)
}