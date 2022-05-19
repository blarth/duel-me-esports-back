import dayjs from "dayjs";
import { prisma } from "../database.js";
import { CreateDataTournament } from "../services/getDataService.js";


export async function create(dataTournament: CreateDataTournament) {
  return await prisma.tournaments.upsert({
    where : {
      apiId : dataTournament.apiId
    },
    update : {
      finishedAt : dataTournament.finishedAt
    },
    create : {
      apiId : dataTournament.apiId,
      name : dataTournament.name,
      startedAt : dataTournament.startedAt,
      finishedAt : dataTournament.finishedAt, 
    }
    
    
  })
}
export async function findAll() {
  return await prisma.tournaments.findMany({
    where : { NOT: [{ finishedAt: null }]},
    select : {
      apiId : true
    }
  })
}