import * as cardRepository from "../repositories/cardRepository";
import * as defaultFunctions from "../generic/functions/functions";


export async function purchase(cardId:number,price:number,password:string,businessId:number) {
    const currentCard=await defaultFunctions.getCard (cardId)

    defaultFunctions.verifyPassword(currentCard,password)

  if (currentCard.isBlocked) throw { type: "error_card_not(Un)Blocked", message: "This card is blocked", };

  return await cardRepository.blockCard(cardId);
}