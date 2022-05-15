import { Request, Response } from 'express'
import { CreateUserData, LoginUserData } from '../repositories/userRepository'
import * as userService from "../services/userService.js"

export async function signUp(req: Request, res: Response) {
  const user : CreateUserData = req.body

  await userService.insert(user)

  res.sendStatus(201)

}
export async function signIn(req: Request, res: Response) {
  const user : LoginUserData = req.body

  const data = await userService.signIn(user)

  res.send(data)

}
