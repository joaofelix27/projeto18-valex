import { Request, Response, NextFunction } from "express";
import * as cardRepository from "../repositories/cardRepository";
import { purchaseType } from "../generic/interfaces/interfaces";
import * as defaultFunctions from '../generic/functions/functions'

export async function validateBusiness(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const purchaseData: purchaseType = req.body
  const {cardId}=purchaseData
  const { rows: card } = await cardRepository.getCard(cardId);
  if (!card.length) throw { type: "error_card_notActivated", message: "Insert a valid cardId" };
  const expired= await isExpired(card);
  if (expired) throw { type: "error_card_notActivated", message: "This card is expired!!" };
  next()
}

type isExpiredType = (
    cardId:any
) => Promise<any>

const isExpired :(isExpiredType)= async (card) => {
  const todayDate= defaultFunctions.getTodayDate().split("/")
  const expirationDate=card[0]?.expirationDate.split("/")
  if (expirationDate[1]>todayDate[1]) return false
  else if (expirationDate[1]===todayDate[1] && expirationDate[0]>=todayDate[0] ) return false
 return true
}