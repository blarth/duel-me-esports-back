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