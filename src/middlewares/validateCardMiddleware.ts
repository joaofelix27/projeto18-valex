import { Request, Response, NextFunction } from "express";
import * as cardRepository from "../repositories/cardRepository";

export interface activateType  {
  cardId:number,cardCVC:number,password:number
}

export async function validateCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const activationData: activateType = req.body
  const {cardId,cardCVC,password}=activationData
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
  console.log(card[0]?.expirationDate)

 return true
}