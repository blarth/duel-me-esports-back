import { Router } from "express";
import * as matchesController from "../controllers/matchesController.js"



const matchesRouter = Router();

matchesRouter.get("/", matchesController.get);


export default matchesRouter;