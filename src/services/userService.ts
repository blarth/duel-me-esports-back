import * as userRepository from "../repositories/userRepository.js"
import {CreateUserData} from "../repositories/userRepository.js"
import { conflictError } from "../utils/errorUtils.js"

export async function insert(user: CreateUserData){

  await isdDuplicateUser(user.email)
  await userRepository.insert(user)
  return
}



export async function isdDuplicateUser(email: string){
  const user = await userRepository.findUniqueByEmail(email)
  if(user) throw conflictError('emails must be unique') 
  return 
}