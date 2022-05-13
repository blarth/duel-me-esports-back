import { Router } from "express";
import * as userController from "../controllers/userController.js"

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);


export default userRouter;
