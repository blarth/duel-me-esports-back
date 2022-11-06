import { Request, Response } from "express";
import * as matchesService from "../services/matchesService.js"


export async function get(_req: Request, res: Response){
  const tournaments = await matchesService.get()
  
  res.send(tournaments)
}
export async function getByUniqueId(req: Request, res: Response){
  const {id} = req.params
  const tournaments = await matchesService.getByUniqueId(Number(id))
  
  res.send(tournaments)
}
export async function getMatch(req: Request, res: Response){
  const {id} = req.params
  const match = await matchesService.getMatchInfoForDuel(Number(id))
  res.send(match)
}
