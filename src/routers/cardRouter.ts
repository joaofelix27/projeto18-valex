import { Router } from "express";
import { validateCompany } from "../middlewares/validateCompanyMiddleware";
import { createCard } from "../controllers/cardController";
import { activateCard } from "../controllers/cardController";
import { validateCard } from "../middlewares/validateCardMiddleware";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import activateSchema from "../schemas/activateSchema";

const cardRouter= Router();

cardRouter.post("/card/create",validateCompany,createCard)
cardRouter.post("/card/activate",validateSchema(activateSchema),validateCard,activateCard)

export default cardRouter;