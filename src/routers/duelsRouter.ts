import { Router } from 'express'
import * as duelsController from '../controllers/duelsController.js'
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js'
import { validateSchemaMiddleware } from '../middlewares/validationSchemaMiddleware.js'
import { duelSchema } from '../schemas/duelSchema.js'

const duelsRouter = Router()

duelsRouter.post(
  '/createDuel/:matchId',
  validateTokenMiddleware,
  validateSchemaMiddleware(duelSchema),
  duelsController.insert  
)

duelsRouter.get(
  '/duel/:id',
  validateTokenMiddleware,
  duelsController.findUnique  
)
duelsRouter.post(
  '/duel/:id',
  validateTokenMiddleware,
  validateSchemaMiddleware(duelSchema),
  duelsController.postDuel  
)

export default duelsRouter
