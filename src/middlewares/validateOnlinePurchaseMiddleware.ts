import { Request, Response, NextFunction } from "express";
import * as cardRepository from "../repositories/cardRepository";
import {  onlinePurchaseType } from "../generic/interfaces/interfaces";
import * as defaultFunctions from '../generic/functions/functions'
import Cryptr from "cryptr";
const cryptr = new Cryptr("myTotallySecretKey");

export async function validateOnlinePurchase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const onlinePurchaseData: onlinePurchaseType = req.body
  const {number,expirationDate,cardCVC,name}=onlinePurchaseData
  const { rows: card } = await cardRepository.getCardByNumber(number);
  if (!card.length) throw { type: "error_notFound", message: "Insert a valid card number" };
  const currentCard=card[0]
  const currentExpirationDate:string=currentCard?.expirationDate
  const currentCardCVC:string= cryptr.decrypt(currentCard?.securityCode)
  const currentCardName:string=currentCard?.cardholderName  
  if(currentExpirationDate!== expirationDate || currentCardCVC !==cardCVC || currentCardName !== name){
    throw { type: "error_badRequest", message: "Card data does not match" };  
  }
  const expired= await defaultFunctions.isExpired(card);
  if (expired) throw { type: "error_unAuthorized", message: "This card is expired!!" };
  res.locals.cardId=currentCard?.id
  next()
}
