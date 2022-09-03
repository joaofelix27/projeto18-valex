import { Router } from "express";
import { validateCompany } from "../middlewares/validateCompanyMiddleware";
import { createCard, activateCard,blockCard,unblockCard } from "../controllers/cardController";
import { validateCard } from "../middlewares/validateCardMiddleware";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import activateSchema from "../schemas/activateSchema";
import blockSchema from "../schemas/blockSchema";

const cardRouter= Router();

cardRouter.post("/card/create",validateCompany,createCard)
cardRouter.post("/card/activate",validateSchema(activateSchema),validateCard,activateCard)
cardRouter.post("/card/block",validateSchema(blockSchema),validateCard,blockCard)
cardRouter.post("/card/unblock",validateSchema(blockSchema),validateCard,unblockCard)

export default cardRouter;