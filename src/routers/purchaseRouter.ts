import { Router } from "express";
import { validateCard } from "../middlewares/validateCreatedCardMiddleware";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import { validateActiveCard } from "../middlewares/validateActiveCardMiddleware";
import { onlinePurchase, purchase } from "../controllers/purchaseControllers";
import purchaseSchema from "../schemas/purchaseSchema";
import { validateBusiness } from "../middlewares/validateBusinessMiddleware";
import onlinePurchaseSchema from "../schemas/onlinePurchaseSchema";
import { validateOnlinePurchase } from "../middlewares/validateOnlinePurchaseMiddleware";

const purchaseRouter= Router();

purchaseRouter.post("/purchase",validateSchema(purchaseSchema),validateCard,validateActiveCard,validateBusiness,purchase)

purchaseRouter.post("/purchase/online",validateSchema(onlinePurchaseSchema),validateOnlinePurchase,onlinePurchase)

export default purchaseRouter;