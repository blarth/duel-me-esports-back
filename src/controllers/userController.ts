import { Request, Response } from 'express'
import { CreateUserData } from '../repositories/userRepository'
import * as userService from "../services/userService.js"

export async function signUp(req: Request, res: Response) {
  const user : CreateUserData = req.body

  await userService.insert(user)

  res.sendStatus(201)

}
