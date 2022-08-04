
import * as duelUserRepository from "../repositories/duelUserRepository.js"

export async function findAllGivenId(id : number){
  const duels = await duelUserRepository.findAllGivenId(id)
  const duelsUpcoming = duels.filter(el => el.duel.match.result === 0)
  const duelsLost = duels.filter(el => el.duel.match.result !== el.team.id && el.duel.match.result !== 0)
  const duelsWon = duels.filter(el => el.duel.match.result === el.team.id && el.duel.match.result !== 0)
  
  const duelsMapped = {
      duelsUpcoming,
      duelsLost,
      duelsWon
  }
  return duelsMapped
}

export async function findAll(){
  const duels = await duelUserRepository.findAll()
  const duelsFiltered = duels.filter(el => el.duelUser.length < 2 && el.match.finishedAt === null)
  return duelsFiltered
}