import * as defaultFunctions from "../generic/functions/functions";
import { insertPurchase } from "../repositories/purchaseRepository";

export async function purchase(
  cardId: number,
  price: number,
  password: string,
  businessId: number
) {
  const currentCard = await defaultFunctions.getCard(cardId);

  defaultFunctions.verifyPassword(currentCard, password);

  if (currentCard.isBlocked)
    throw { type: "error_unAuthorized", message: "This card is blocked" };
  const enoughBalance = await defaultFunctions.enoughBalance(cardId, price);
  if (!enoughBalance)
    throw { type: "error_preCondition", message: "Not enough balance" };

  return await insertPurchase(cardId, businessId, price);
}

export async function onlinePurchase(
  cardId: number,
  price: number,
  businessId: number
) {
  const currentCard = await defaultFunctions.getCard(cardId);
  await defaultFunctions.getBusiness(businessId, currentCard);
  if (currentCard.isBlocked)
    throw { type: "error_unAuthorized", message: "This card is blocked" };
  const enoughBalance = await defaultFunctions.enoughBalance(cardId, price);
  if (!enoughBalance)
    throw { type: "error_preCondition", message: "Not enough balance" };

  return await insertPurchase(cardId, businessId, price);
}
