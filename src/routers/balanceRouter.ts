import { Router } from "express";
import { validateCard } from "../middlewares/validateCreatedCardMiddleware";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import balanceSchema from "../schemas/balanceSchema";
import { balance } from "../controllers/balanceController";

const balanceRouter= Router();

balanceRouter.post("/balance",validateSchema(balanceSchema),validateCard,balance)

export default balanceRouter;