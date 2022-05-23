import * as userRepository from "../repositories/userRepository.js"
import {CreateUserData, LoginUserData} from "../repositories/userRepository.js"
import { conflictError, unauthorizedError } from "../utils/errorUtils.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

export async function insert(user: CreateUserData){

  await isdDuplicateUser(user.email)
  const passwordHash = bcrypt.hashSync(user.password, 10);
  await userRepository.insert({...user, password : passwordHash})
  return
}
export async function signIn(user: LoginUserData){
  
  const userDb = await userRepository.findUniqueByEmail(user.email)
  validatePassword(user.password, userDb.password)
  const token = uuid();
  await userRepository.createSession(token, userDb.id);
  
  return { token: token, user: {name : userDb.name, image : userDb.image, blerth : userDb.blerth} };
  
}

export async function findByToken(token : string){
  const user = await userRepository.findUniqueByToken(token)
  return user

}



export async function isdDuplicateUser(email: string){
  const user = await userRepository.findUniqueByEmail(email)
  if(user) throw conflictError('emails must be unique') 
  return 
}

function validatePassword(userPassword : string, password : string){
  if (!bcrypt.compareSync(userPassword, password)) {
    throw unauthorizedError('Unauthorized') 
  }
  return
}