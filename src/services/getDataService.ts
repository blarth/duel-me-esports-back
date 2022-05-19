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
    for(const tournament of tournaments){


      const response = await axios.get(
        `https://api.pandascore.co/tournaments/${tournament.apiId}/matches`,
        createConfig(process.env.MY_API_KEY)
      )
  
      const filtredResultUpcoming = response.data.filter(
        (match) => match.opponents.length > 0
      )
      
      
      const matches = filtredResultUpcoming.filter((match) => dayjs().isBefore(dayjs(match.begin_at)))
      
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
          result : match.winner_id === null ? 0 : match.winner_id
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
/* export async function getDataResultMatch(req: Request, res: Response) {

  try {
    const response = await axios.get(
      `
    https://api.pandascore.co/matches/${matchId}`,
      createConfig('4PUOvVeucJQAUiPpMHPuTajiDRKyFSCkM0zC4O-pV9T-X9BagRo')
    )

    res.send(response.data)
  } catch (error) {
    console.log(error)
  }
} */
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
    https://api.pandascore.co/csgo/tournaments?filter[tier]=s,a`,
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
    console.log(error)
  }
}

async function setIntervalUpdate() {
  setInterval(updateMatchesUpcoming, 600000)

}

function oddsGenerator(){
  const leftTeamOdd = Math.random()
  const rightTeamOdd = 1-leftTeamOdd
  
  return {leftTeamOdd : Number((1/leftTeamOdd).toFixed(2)), rightTeamOdd : Number((1/rightTeamOdd).toFixed(2))}
}

async function updateMatchesUpcoming(){
  const tournaments = await dbTournamentRepository.findAll()
  for(const tournament of tournaments){
   const matches = await dbMatchesRepository.findAllByTournament(tournament.apiId) 
   const removeMatches = matches.filter(match => dayjs().isAfter(dayjs(match.startedAt)))
   const idRemove = removeMatches.map(match => match.id)
   /* await dbMatchesRepository.deleteMany(idRemove) */
   return
  }
}