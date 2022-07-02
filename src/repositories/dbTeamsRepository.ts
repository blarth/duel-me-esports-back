import { prisma } from '../database.js'
import { CreateDataMatchesTeams, CreateDataTeams } from '../services/getDataService.js'

export async function create(teamData: CreateDataTeams) {
  return await prisma.teams.upsert({
    where: {
      apiTeamId: teamData.apiTeamId,
    },
    update : {},
    create: {
      ...teamData
    },
  })
}
export async function createRelation(matchesTeamsData: CreateDataMatchesTeams) {
  return await prisma.matchesTeams.upsert({
    where : {
      opponents : {
        matchId : matchesTeamsData.matchId,
        teamId : matchesTeamsData.teamId
      }
    },
    update : {},
    create : {
      matchId : matchesTeamsData.matchId,
      teamId : matchesTeamsData.teamId,
      odd : matchesTeamsData.odd
    }
  })
}
