import { Request, Response } from "express";
import * as matchesService from "../services/matchesService.js"
import * as duelsService from "../services/duelsService.js"


export async function get(req: Request, res: Response){
  const tournaments = await matchesService.get()
  res.send(tournaments)
}
export async function findAll(req: Request, res: Response){
  const duels = await duelsService.findAll()
  res.send(duels)
}
export async function getMatch(req: Request, res: Response){
  const {id} = req.params
  const match = await matchesService.getMatchInfoForDuel(Number(id))
  res.send(match)
}

export async function insert(req : Request, res : Response){
  const {matchId} = req.params
  const {userId} = res.locals
  const {teamId, bet} = req.body
  const duelId = await duelsService.create({matchId : +matchId, userId, teamId, bet})
  res.send({duelId})
}

export async function findUnique(req : Request, res : Response){
  const {id} = req.params
  const duel = await duelsService.findUniqueById(Number(id))
  res.send(duel)
}
export async function postDuel(req : Request, res : Response){
  const {id} = req.params
  const {userId} = res.locals
  const {teamId, bet} = req.body
  await duelsService.postDuel(Number(id), userId, bet, teamId)
  res.send(id).status(200)
}