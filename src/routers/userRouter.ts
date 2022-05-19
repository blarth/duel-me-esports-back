import { Router } from "express";
import * as userController from "../controllers/userController.js"
import { validateSchemaMiddleware } from "../middlewares/validationSchemaMiddleware.js";
import { loginSchema } from "../schemas/loginSchema.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchemaMiddleware(userSchema), userController.signUp);
userRouter.post("/sign-in", validateSchemaMiddleware(loginSchema), userController.signIn);


export default userRouter;
