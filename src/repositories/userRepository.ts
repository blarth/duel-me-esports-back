import { User } from "@prisma/client";
import { prisma } from "../database.js";


export type CreateUserData = Omit<User, 'id' | 'score'>

export async function findUniqueByEmail(email : string){
  return prisma.user.findUnique({where : {
    email
  }})
}

export async function insert(user : CreateUserData){
  return prisma.user.create({
    data : user
  })
}