import dayjs from "dayjs"
import * as duelsRepository from "../repositories/duelsRepository.js"
import * as userRepository from "../repositories/userRepository.js"
import * as matchesRepository from "../repositories/matchesRepository.js"
import { badRequest, conflictError } from "../utils/errorUtils.js"

export async function create({matchId, userId, teamId, bet}){
  await validateBalance(userId, bet)
  const match = await matchesRepository.findUniqueById(matchId)
  validateMatch(match)
  
    const {id} = await duelsRepository.insert(matchId)
    await duelsRepository.insertRelation({userId, teamId, bet, duelId : id}, userId, bet)
    return id
 
}

export async function findAll(){
  const duels = await duelsRepository.findAll()
  return duels
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
    const duel = await duelsRepository.findUniqueById(id)
    const arrDuelist = duel.duelUser
    validateMatch(duel.match)
    validateDuel(arrDuelist, userId)
    await duelsRepository.insertRelation({userId, teamId, bet, duelId : id}, userId, bet)
    return 
}



function validateDuel(arrDuelist ,userId){
  if(arrDuelist.filter(duelist => duelist.user.id === userId).length > 0) throw conflictError("Você não pode duelar consigo mesmo neh!")
  if(arrDuelist.length > 1) throw badRequest("Alguém ja pegou a vaga desse duelo =(")
  return
}

function validateMatch(match : any){
  if(dayjs().isAfter(dayjs(match.startedAt))) throw badRequest("Essa partida ja começou =(")
  return
}