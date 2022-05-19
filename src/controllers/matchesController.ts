import { Request, Response } from "express";
import * as matchesService from "../services/matchesService.js"


export async function get(req: Request, res: Response){
  const tournaments = await matchesService.get()
  res.send(tournaments)
}