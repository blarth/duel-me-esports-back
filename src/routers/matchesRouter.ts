import { Router } from "express";
import * as matchesController from "../controllers/matchesController.js"



const matchesRouter = Router();

matchesRouter.get("/", matchesController.get);
matchesRouter.get("/:id", matchesController.getByUniqueId);
matchesRouter.get("/duels/:id", matchesController.getMatch);


export default matchesRouter;
