import { Matches, MatchesTeams, Teams, Tournaments } from '@prisma/client'
import axios from 'axios'
import dayjs from 'dayjs'
import { Request, Response } from 'express'
import * as dbTournamentRepository from '../repositories/dbTournamentRepository.js'
import * as dbMatchesRepository from '../repositories/dbMatchesRepository.js'
import * as dbTeamsRepository from '../repositories/dbTeamsRepository.js'


export type CreateDataTournament = Omit<Tournaments, 'id'>
export type CreateDataMatches = Omit<Matches, 'id' | 'createdAt' | 'updatedAt'>
export type CreateDataTeams = Omit<Teams, 'id'>
export type CreateDataMatchesTeams = Omit<MatchesTeams, 'id'>

function createConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}
export async function getDataUpcoming(req: Request, res: Response) {
  try {
    const tournaments = await dbTournamentRepository.findAll()
    console.log(tournaments)
    for(const tournament of tournaments){


      const response = await axios.get(
        `https://api.pandascore.co/tournaments/${tournament.apiId}/matches`,
        createConfig(process.env.MY_API_KEY)
      )
      
  
      const filteredResultUpcoming = response.data.filter(
        (match) => match.opponents.length > 1
      )
      
      
      
      const matches = filteredResultUpcoming.filter((match) => dayjs().isBefore(dayjs(match.begin_at)))
     
      for (const match of matches) {
        const {leftTeamOdd , rightTeamOdd} = oddsGenerator()
        const data: CreateDataMatches = {
          apiTournamentId: tournament.apiId,
          apiMatchesId: match.id,
          name: match.name,
          startedAt: match.begin_at,
          finishedAt: match.end_at,
          leftTeamOdd,
          rightTeamOdd,
          result : match.winner_id === null && 0 
        }
        await dbMatchesRepository.create(data)
        const teams = match.opponents.map((team) => {
          return {
            apiTeamId : team.opponent.id,
            name : team.opponent.name,
            logo : team.opponent.image_url
          }
        })
        for(const team of teams){
          
          await dbTeamsRepository.create(team)
        }
        for(const team of teams){
          await dbTeamsRepository.createRelation({teamId : team.apiTeamId, matchId : match.id })
        }
    }
    }

    
    res.sendStatus(200)
    
  } catch (error) {
    console.log(error)
  }
}

export async function getDataResultMatch(req: Request, res: Response) {

  try {
    await setIntervalUpdate()
  } catch (error) {
    console.log(error)
  }
  res.sendStatus(200)
}

export async function getDataTournament(req: Request, res: Response) {
  try {
    const response = await axios.get(
      `
    https://api.pandascore.co/lol/tournaments?filter[tier]=s,a`,
      createConfig(process.env.MY_API_KEY)
    )
    
    const tournaments = response.data.filter((tournament) => dayjs().isBefore(dayjs(tournament.end_at)))
    
    for (const tournament of tournaments) {
      const data: CreateDataTournament = {
        apiId: tournament.id,
        name: tournament.league.name,
        startedAt: tournament.begin_at,
        finishedAt: tournament.end_at,
      }
      
      await dbTournamentRepository.create(data)
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(error.status)
  }
}

async function setIntervalUpdate() {
  getDataResult()

  setInterval(getDataUpcoming, 600000)
  setInterval(getDataResult, 600000)

}

async function getDataResult() {
  const matches = await dbMatchesRepository.findAllFinished()
  const filtredMatches = matches.filter(match => match.finishedAt === null && match.result === 0)
  for(const match of filtredMatches){
    const response = await axios.get(
      `
    https://api.pandascore.co/matches/${match.apiMatchesId}`,
      createConfig(process.env.MY_API_KEY)
    )
    if(response.data.winner === null) continue
    const updatedMatches = await dbMatchesRepository.update(response.data.winner.id, response.data.end_at , match.id)
    const duels = await dbMatchesRepository.FindAllDuelsByMatchId(match.id)
    
    
  }
}

function oddsGenerator(){
  const leftTeamOdd = Math.random()
  const rightTeamOdd = 1-leftTeamOdd
  
  return {leftTeamOdd : Number((1/leftTeamOdd).toFixed(2)), rightTeamOdd : Number((1/rightTeamOdd).toFixed(2))}
}

