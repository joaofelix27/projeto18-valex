import { Router } from "express";
import { validateCompany } from "../middlewares/validateCompanyMiddleware";

const cardRouter= Router();

cardRouter.post("/card/create",validateCompany)

export default cardRouter;