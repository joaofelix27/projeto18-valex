

import { Request, Response, NextFunction } from "express";

export async function validateActiveCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const currentCard:any = res.locals.card;
  if (!currentCard?.password) throw { type: "error_unAuthorized", message: "This card has not been activated yet" };
  next()
}