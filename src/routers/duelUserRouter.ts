import { Router } from 'express'
import * as duelUserController from '../controllers/duelUserController.js'
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js'


const duelUserRouter = Router()

duelUserRouter.get(
  '/my-duels',
  validateTokenMiddleware,
  duelUserController.findAllGivenId  
)

duelUserRouter.get('/duelUser', duelUserController.findAll)

export default duelUserRouter