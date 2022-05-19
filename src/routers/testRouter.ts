import { Router } from "express";
import * as testsController from "../controllers/testController.js"
import * as dataService from "../services/getDataService.js"


const testsRouter = Router();

testsRouter.post("/reset-database", testsController.resetDatabase);
testsRouter.get("/dbUpcomingMatches", dataService.getDataUpcoming);
testsRouter.get("/dbResultByMatches", dataService.getDataResultMatch);
testsRouter.get("/dbDataTournament", dataService.getDataTournament);


export default testsRouter;