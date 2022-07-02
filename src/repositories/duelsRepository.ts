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
export async function insertRelation(data : CreateDuelRelation, id:number, bet : number){
  return await prisma.$transaction([prisma.duelUser.create({
    data
  }), prisma.user.update({
    where : {
      id
    },
    data : {
      blerth : {
        decrement : bet
      }
    }
  })])
  
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
          matchesTeam : {
            select : {
              team : {
                select : {
                  id : true,
                  name : true,
                  logo : true,
                  duelUser : {
                    select : {user : {
                      select : {
                        id : true,
                        name : true,
                        image : true,
                      }
                    },
                    bet : true,
                    teamId : true}
                  }
                }
              },
              odd : true
            }
          }
        }
      },
      duelUser : {
        select : {user : {
          select : {
            id : true,
            name : true,
            image : true,
          }
        },
        bet : true,
        teamId : true}
      }    
    }
  })
}

export async function findAll(){
  return await prisma.duel.findMany({
    select : {
      id : true,
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

export async function openDuels(userId : number, bet : number, duelId : number){
  return prisma.$transaction([
    prisma.user.update({
      where : {
        id : userId
      },
      data : {
        blerth : {
          increment : bet
        }
      }
    }),
    prisma.duel.delete({
      where : {
        id : duelId
      }
    })
  ])
}

export async function update(userId : number, bet : number){
  
    return await prisma.$transaction([
      prisma.user.update({
        where : {
          id : userId
        },
        data : {
          blerth : {
            increment : bet 
          }
        }
      })
    ])
  
}
