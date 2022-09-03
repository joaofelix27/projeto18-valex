import { Router } from "express";
import { validateCard } from "../middlewares/validateCreatedCardMiddleware";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import { validateActiveCard } from "../middlewares/validateActiveCardMiddleware";
import { purchase } from "../controllers/purchaseControllers";
import purchaseSchema from "../schemas/purchaseSchema";
import { validateBusiness } from "../middlewares/validateBusinessMiddleware";

const purchaseRouter= Router();

purchaseRouter.post("/purchase",validateSchema(purchaseSchema),validateCard,validateActiveCard,validateBusiness,purchase)

export default purchaseRouter;