

import { Request, Response, NextFunction } from "express";
import * as cardRepository from "../repositories/cardRepository";
import { activateType } from "../generic/interfaces/interfaces";

export async function validateActiveCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const activationData: activateType = req.body
  const {cardId}=activationData
  const { rows: card } = await cardRepository.getCard(cardId);
  const currentCard:any = card[0];
  if (!currentCard?.password) throw { type: "error_card_notActivated", message: "This card has not been activated yet" };
  next()
}