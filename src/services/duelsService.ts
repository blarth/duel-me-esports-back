import * as duelsRepository from "../repositories/duelsRepository.js"
import * as userRepository from "../repositories/userRepository.js"
import { badRequest, conflictError } from "../utils/errorUtils.js"

export async function create({matchId, userId, teamId, bet}){
  await validateBalance(userId, bet)
  try {
    const duel = await duelsRepository.insert(matchId)
    const duelId = duel.id
    await duelsRepository.insertRelation({userId, teamId, bet, duelId})
    await duelsRepository.deductBlerths(userId, bet)
    return duelId
  } catch (error) {
    console.log(error)
  }
 
}

async function validateBalance(id: number, bet: number) {
  const {blerth} = await userRepository.findUniqueById(id)
  if(blerth < bet) throw badRequest("Balanço insuficiente")
  return
}


export async function findUniqueById(id : number){
  const duel = await duelsRepository.findUniqueById(id)
  return duel
}

export async function postDuel(id:number, userId: number, bet : number, teamId : number) {
  await validateBalance(userId, bet)
  try {
    const duel = await duelsRepository.findUniqueById(id)
    validateDuel(duel.duelUser, userId)
    console.log({userId, teamId, bet, duelId : id})
    await duelsRepository.insertRelation({userId, teamId, bet, duelId : id})
    await duelsRepository.deductBlerths(userId, bet)
    return 
  } catch (error) {
    console.log(error)
  }
}

function validateDuel(arrDuelist ,userId){
  console.log(arrDuelist)
  console.log(arrDuelist.filter(duelist => duelist.user.id === userId))
  if(arrDuelist.filter(duelist => duelist.user.id === userId).length > 0) throw conflictError("Você não pode duelar consigo mesmo neh!")
  if(arrDuelist.length > 1) throw badRequest("Alguém ja pegou a vaga desse duelo =(")
  return
}