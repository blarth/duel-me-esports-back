import { User } from "@prisma/client";
import { prisma } from "../database.js";


export type CreateUserData = Omit<User, 'id' | 'blerths'>
export type LoginUserData = Omit<User, 'id' | 'blerths' | 'image' | 'name'>

export async function findUniqueByEmail(email : string){
  return await prisma.user.findUnique({where : {
    email
  }})
}
export async function findUniqueById(id : number){
  return await prisma.user.findUnique({where : {
    id
  },
select : {
  blerth : true
}})
}
export async function findUniqueByToken(token : string){
  return await prisma.session.findUnique({where : {
    token
  },
select : {
  userId : true
}})
}

export async function insert(user : CreateUserData){
  return await prisma.user.create({
    data : user
  })
}
export async function createSession(token : string, id : number){
  return await prisma.session.create({
    data : {token, userId : id}
  })
}