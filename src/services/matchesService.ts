import * as matchesRepository from "../repositories/matchesRepository.js"


export async function get(){
  const tournaments = await matchesRepository.findAll()
  return tournaments.filter(tournament => tournament.Matches.length > 0 )
}
export async function getByUniqueId(id : number){
  const tournaments = await matchesRepository.findUniqueIdTournament(id)
  return tournaments
}
export async function getMatchInfoForDuel(id : number){
  const match = await matchesRepository.findUniqueById(id)
  return match
}