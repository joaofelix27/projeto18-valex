import { Request, Response, NextFunction } from "express";
import * as cardRepository from "../repositories/cardRepository";
import { activateType } from "../generic/interfaces/interfaces";
import * as defaultFunctions from '../generic/functions/functions'

export async function validateCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const activationData: activateType = req.body
  const {cardId}=activationData
  const { rows: card } = await cardRepository.getCard(cardId);
  if (!card.length) throw { type: "error_badRequest", message: "Insert a valid cardId" };
  res.locals.card=card[0]
  const expired= await defaultFunctions.isExpired(card);
  if (expired) throw { type: "error_unAuthorized", message: "This card is expired!!" };
  next()
}

