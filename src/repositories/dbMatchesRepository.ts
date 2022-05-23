
import { prisma } from "../database.js";
import { CreateDataMatches } from "../services/getDataService.js";



export async function create(dataMatch: CreateDataMatches) {
  return await prisma.matches.upsert({
    where : {
      apiMatchesId : dataMatch.apiMatchesId
    },
    update : {
      startedAt: dataMatch.startedAt,
    },
    create : {
      apiTournamentId: dataMatch.apiTournamentId,
      apiMatchesId: dataMatch.apiMatchesId,
      name: dataMatch.name,
      startedAt: dataMatch.startedAt,
      finishedAt: dataMatch.finishedAt,
      leftTeamOdd : dataMatch.leftTeamOdd,
      rightTeamOdd : dataMatch.rightTeamOdd,
      result : dataMatch.result,
    }
  })
}
export async function update(result: number, finishedAt : any,id : number) {
  return await prisma.matches.update({
    where : {
      id
    },
    data : {
      result,
      finishedAt
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
export async function findAllFinished() {
  return await prisma.matches.findMany({
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

export async function FindAllDuelsByMatchId(id : number){
  return await prisma.duel.findMany({
    where : {
      match : {
        id
      }
    },
    select : {
      duelUser : {
        select : {
          teamId : true,
          bet : true,
          userId : true
        }
      }
    }

  })
}