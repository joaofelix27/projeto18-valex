import { Router } from "express";
import { validateCompany } from "../middlewares/validateCompanyMiddleware";
import { createCard } from "../controllers/cardController";

const cardRouter= Router();

cardRouter.post("/card/create",validateCompany,createCard)

export default cardRouter;