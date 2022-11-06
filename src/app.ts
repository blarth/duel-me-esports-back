import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js'
import router from './routers/index.js'

import testsRouter from './routers/testRouter.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
console.log("Hello wesley")

if (process.env.NODE_ENV === 'tests') {
  app.use(testsRouter)
}

app.use(errorHandlerMiddleware)

export default app
