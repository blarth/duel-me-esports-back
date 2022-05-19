import { Router } from "express";
import testsRouter from "./testRouter.js";
import userRouter from "./userRouter.js"
import matchesRouter from "./matchesRouter.js"

const router = Router()

router.use(userRouter)
router.use(testsRouter)
router.use(matchesRouter)



export default router;