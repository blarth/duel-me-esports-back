import * as matchesRepository from "../repositories/matchesRepository.js"

export async function get(){
  const tournaments = await matchesRepository.findAll()
  return tournaments.filter(tournament => tournament.Matches.length > 0)
}