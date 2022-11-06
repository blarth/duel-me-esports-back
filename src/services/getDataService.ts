import { Matches, MatchesTeams, Teams, Tournaments } from '@prisma/client'
import axios from 'axios'
import dayjs from 'dayjs'
import { Request, Response } from 'express'
import * as dbTournamentRepository from '../repositories/dbTournamentRepository.js'
import * as dbMatchesRepository from '../repositories/dbMatchesRepository.js'
import * as dbTeamsRepository from '../repositories/dbTeamsRepository.js'
import * as duelsRepository from '../repositories/duelsRepository.js'

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

export async function controllerDataUpcoming(req: Request, res: Response) {
  await getDataUpcoming()
  res.sendStatus(200)
}
export async function getDataUpcoming() {
  const tournaments = await dbTournamentRepository.findAll()

  for (const tournament of tournaments) {
    const response = await axios.get(
      `https://api.pandascore.co/tournaments/${tournament.apiId}/matches`,
      createConfig(process.env.MY_API_KEY)
    )

    const filteredResultUpcoming = response.data.filter(
      (match) => match.opponents.length > 1
    )

    const matches = filteredResultUpcoming.filter((match) =>
      dayjs().isBefore(dayjs(match.begin_at))
    )

    for (const match of matches) {
      const { leftTeamOdd, rightTeamOdd } = oddsGenerator()
      const data: CreateDataMatches = {
        apiTournamentId: tournament.apiId,
        apiMatchesId: match.id,
        name: match.name,
        startedAt: match.begin_at,
        finishedAt: match.end_at,
        result: match.winner_id === null && 0,
      }
      await dbMatchesRepository.create(data)
      const teams = match.opponents.map((team) => {
        return {
          apiTeamId: team.opponent.id,
          name: team.opponent.name,
          logo: team.opponent.image_url,
        }
      })
      for (const team of teams) {
        await dbTeamsRepository.create(team)
      }
      const teamRelation = teams.map((team, index: number) => {
        let odd: number

        if (index === 0) {
          odd = leftTeamOdd
        } else {
          odd = rightTeamOdd
        }

        return {
          teamId: team.apiTeamId,
          matchId: match.id,
          odd,
        }
      })
      for (const teamMatch of teamRelation) {
        await dbTeamsRepository.createRelation(teamMatch)
      }
    }
  }
  console.log('Matches Atualizado')
}

export async function getDataResultMatch(req: Request, res: Response) {
  await setIntervalUpdate()
  res.sendStatus(200)
}

export async function getDataTournament(req: Request, res: Response) {
  const response = await axios.get(
    `

    https://api.pandascore.co/csgo/tournaments?filter[tier]=s`,
    createConfig(process.env.MY_API_KEY)
  )
  

  const tournaments = response.data.filter((tournament) =>
    dayjs().isBefore(dayjs(tournament.end_at))
  )
  

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
}

async function setIntervalUpdate() {
  
  await getDataUpcoming()
  
  await getDataResult()
  
  setInterval(getDataUpcoming, 600000)
  setInterval(getDataResult, 300000)
}

async function getDataResult() {
  const matches = await dbMatchesRepository.findAll()
  
  const filteredMatches = matches.filter(
    (match) =>
      dayjs().isAfter(dayjs(match.startedAt)) && match.finishedAt === null
  )
  for (const match of filteredMatches) {
    const response = await axios.get(
      `
    https://api.pandascore.co/matches/${match.apiMatchesId}`,
      createConfig(process.env.MY_API_KEY)
    )
    const duels = await dbMatchesRepository.FindAllDuelsByMatchId(match.id)
    if (response.data.winner === null) {
      const closedDuels = duels.filter((duel) => duel.duelUser.length < 2)
      closedDuels.forEach(async (duel) => {
        await duelsRepository.openDuels(
          duel.duelUser[0].userId,
          duel.duelUser[0].bet,
          duel.id
        )
      })
      continue
    }
    const openDuels = duels.filter((duel) => duel.duelUser.length === 2)
    const updatedMatch = await dbMatchesRepository.update(
      response.data.winner.id,
      response.data.end_at,
      match.id
    )
    const {
      team: { id },
    } = updatedMatch.matchesTeam.find((el) => el.teamId === updatedMatch.result) //TeamId is read as teamApiId
    openDuels.forEach(async (duel) => {
      const amount = duel.duelUser.reduce((total, acc) => total + acc.bet, 0)
      const winner = duel.duelUser.find((duelist) => duelist.teamId === id)
      console.log(winner)
      console.log(amount)
      await duelsRepository.update(winner.userId, amount)
    })
  }
  console.log('Data Atualizado')
  return
}

function oddsGenerator() {
  const leftTeamOdd = Math.random()
  const rightTeamOdd = 1 - leftTeamOdd

  return {
    leftTeamOdd: Number((1 / leftTeamOdd).toFixed(2)),
    rightTeamOdd: Number((1 / rightTeamOdd).toFixed(2)),
  }
}
