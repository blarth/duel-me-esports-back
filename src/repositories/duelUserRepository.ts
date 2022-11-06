import { prisma } from "../database.js";

export async function findAllGivenId(userId : number){
  return await prisma.duelUser.findMany({
    where : {
      userId
    },
    select : {
          user : {
            select : {
              id : true,
              name : true,
              image : true,
            }
          },
          duel : {
            select : {
              match : {
                select : {
                  result : true
                }
              }
            }
          },
          bet : true,
          duelId : true,
          team : {
            select : {
              id : true,
              logo : true
            }
          }
    }
  })
}

export async function findAll(){
  return await prisma.duel.findMany({
    select : {
      duelUser : {
        select : {
          bet: true,
          team : {
            select : {
              logo : true,
            }
          },
          user : {
            select : {
              id : true,
              name : true,
              image : true,
            }
          },
        }
      },
      id : true,
      match : {
        select : {
          finishedAt : true
        }
      }
    }
  })
}
