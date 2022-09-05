import { Router } from "express";
import { validateCompany } from "../middlewares/validateCompanyMiddleware";
import { createCard, activateCard,blockCard,unblockCard,rechargeCard } from "../controllers/cardController";
import { validateCard } from "../middlewares/validateCreatedCardMiddleware";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import activateSchema from "../schemas/activateSchema";
import blockSchema from "../schemas/blockSchema";
import rechargeSchema from "../schemas/rechargeSchema";
import { validateActiveCard } from "../middlewares/validateActiveCardMiddleware";
import createSchema from "../schemas/createSchema";

const cardRouter= Router();

cardRouter.post("/card/create",validateSchema(createSchema),validateCompany,createCard)
cardRouter.post("/card/activate",validateSchema(activateSchema),validateCard,activateCard)
cardRouter.post("/card/block",validateSchema(blockSchema),validateCard,validateActiveCard,blockCard)
cardRouter.post("/card/unblock",validateSchema(blockSchema),validateCard,validateActiveCard,unblockCard)
cardRouter.post("/card/recharge",validateSchema(rechargeSchema),validateCompany,validateCard,validateActiveCard,rechargeCard)

export default cardRouter;