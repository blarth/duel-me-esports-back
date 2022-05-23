import { prisma } from "../database.js";

export async function findAll(){
  return await prisma.tournaments.findMany({
    where : {
      NOT : [{finishedAt : null}] 
    },

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


export async function findUniqueById(id : number) {
  return await prisma.matches.findUnique({
    where : {
      id : id
    },
    select : {
      id : true,
      name : true,
      startedAt : true,
      leftTeamOdd : true,
      rightTeamOdd : true,
      matchesTeam : {
        select : {
          team : {
            select : {
              id : true,
              name : true,
              logo : true
            }
          }
        }
      }
    }
  })
}

