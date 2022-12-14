import { Request, Response, NextFunction } from "express";
import { purchaseType } from "../generic/interfaces/interfaces";
import { getBusiness } from "../repositories/businessRepository";

export async function validateBusiness(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const purchaseData: purchaseType = req.body; const {businessId}=purchaseData
  const { rows: businesses } = await getBusiness(businessId);
  if (!businesses.length) throw { type: "error_badRequest", message: "Insert a valid businessId" };
  const currentCard:any = res.locals.card; const currentBusiness:any=businesses[0]
  if(currentCard.type!==currentBusiness.type) throw { type: "error_conflict", message: "The card type does not match the business type" };
  next()
}

