import { Router } from "express";
import cardRouter from "./cardRouter";
import purchaseRouter from "./purchaseRouter";

const router=Router();

router.use(cardRouter);
router.use(purchaseRouter);

export default router;
