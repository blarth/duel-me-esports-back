import { prisma } from "../database.js";
import { CreateDataMatches } from "../services/getDataService.js";



export async function create(dataMatch: CreateDataMatches) {
  return await prisma.matches.upsert({
    where : {
      apiMatchesId : dataMatch.apiMatchesId
    },
    update : {
      result : dataMatch.result
    },
    create : {
      apiTournamentId: dataMatch.apiTournamentId,
      apiMatchesId: dataMatch.apiMatchesId,
      name: dataMatch.name,
      startedAt: dataMatch.startedAt,
      finishedAt: dataMatch.finishedAt,
      leftTeamOdd : dataMatch.leftTeamOdd,
      rightTeamOdd : dataMatch.rightTeamOdd,
    }
  })
}

export async function findAllByTournament(id: number) {
  return await prisma.matches.findMany({
    where : {
      apiTournamentId : id
    }
  })
}

export async function deleteMany(ids: number[]) {

  return await prisma.matches.deleteMany({
    where: {
        id: {
            in: ids
        }
    }
  })
} 