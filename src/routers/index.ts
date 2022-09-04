import { Router } from "express";
import balanceRouter from "./balanceRouter";
import cardRouter from "./cardRouter";
import purchaseRouter from "./purchaseRouter";

const router=Router();

router.use(cardRouter);
router.use(purchaseRouter);
router.use(balanceRouter);

export default router;
