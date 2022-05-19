import { prisma } from "../database.js";

export async function findAll(){
  return await prisma.tournaments.findMany({
    select : {
      id : true,
      name :true,
      Matches : {
        select : {
          id : true,
          apiTournamentId : true,
          name : true,
          apiMatchesId : true,
          startedAt : true,
          leftTeamOdd : true,
          rightTeamOdd : true,
          matchesTeam : {
            select : {
              matchId : true,
              teamId : true,
              team : {
                select : {
                  name : true,
                  logo : true
                }
              }
            }
          }
        },
        
      }
    },
    orderBy : {
        startedAt : "asc"
    }
  })
}