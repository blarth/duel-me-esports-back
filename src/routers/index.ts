import { Router } from "express";
import testsRouter from "./testRouter.js";
import userRouter from "./userRouter.js"
import matchesRouter from "./matchesRouter.js"
import duelsRouter from "./duelsRouter.js";
import duelUserRouter from "./duelUserRouter.js";

const router = Router()

router.use(userRouter)
router.use(testsRouter)
router.use(matchesRouter)
router.use(duelsRouter)
router.use(duelUserRouter)



export default router;