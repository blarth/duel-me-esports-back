import { Duel, DuelUser } from "@prisma/client";
import { prisma } from "../database.js";

export type CreateDuelRelation = Omit<DuelUser, 'id' | 'createdAt' >
export type CreateDuelData = Omit<Duel, 'id' | 'createdAt' | 'updatedAt' >

export async function insert(matchId : number){
  return await prisma.duel.create({
    data : {
      matchId
    }
  })
}
export async function insertRelation(data : CreateDuelRelation){
  return await prisma.duelUser.create({
    data
  })
}

export async function findUniqueById(id: number) {
  return await prisma.duel.findUnique({
    where : {
      id
    },
    select : {
      match : {
        select : {
          id : true,
          startedAt : true,
          leftTeamOdd : true,
          rightTeamOdd : true,
          matchesTeam : {
            select : {
              team : {
                select : {
                  id : true,
                  name : true,
                  logo : true,

                }
              }
            }
          }
        }
      },
      duelUser : {
        select : {
          user : {
            select : {
              id : true,
              name : true,
              image : true,
            }
          },
          bet : true,
          teamId : true
        }
      }
      
    }
  })
}

export async function deductBlerths(id:number, bet : number) {
  return prisma.user.update({
    where : {
      id
    },
    data : {
      blerth : {
        decrement : bet
      }
    }
  })
}