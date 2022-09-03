import * as employeeRepository from "../repositories/empolyeeRepository";
import * as cardRepository from "../repositories/cardRepository";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import * as defaultFunctions from "../generic/functions/functions";

const cryptr = new Cryptr("myTotallySecretKey");


export async function createCard(employeeId: number, type: string) {
  const cardTypes: any = {
    groceries: true,
    restaurant: true,
    transport: true,
    education: true,
    health: true,
  };
  if (!cardTypes[type]) {
    throw {
      type: "error_card_notCreated",
      message: "This type of card is not available",
    };
  }
  const { rows: user } = await employeeRepository.getEmployee(employeeId);
  const { rows: cards } = await cardRepository.getEmployeeCardsByType(
    employeeId,
    type
  );
  if (user.length < 1) {
    throw {
      type: "error_card_notCreated",
      message: "Employee id is not registred in the database yet",
    };
  }
  if (cards.length > 0) {
    throw {
      type: "error_card_notCreated",
      message: "Employee already has a card with this type",
    };
  }
  const name = user[0]?.fullName?.toUpperCase();
  const cardNumber: number = Number(
    faker.finance.creditCardNumber("###############L")
  );
  const creditCardCVV: string = faker.finance.creditCardCVV();
  const cardExpeditionDate: string = defaultFunctions.getTodayDate();
  const cardExpirationDate: string = defaultFunctions.getExpirationDate(cardExpeditionDate);
  const encryptedCVV = cryptr.encrypt(creditCardCVV);
  const cardName = defaultFunctions.getCardName(name);
  return await cardRepository.createCard(
    employeeId,
    cardNumber,
    cardName,
    encryptedCVV,
    cardExpirationDate,
    type
  );
}

export async function activateCard(
  cardId: number,
  cardCVC: string,
  password: string
) {
  const { rows: card } = await cardRepository.getCard(cardId);
  const encryptedPassword: string = bcrypt.hashSync(password, 10);

  const currentCard = card[0];

  if (currentCard?.password)
    throw {
      type: "error_card_notActivated",
      message: "Card already activated",
    };

  const currentCardCVC = currentCard?.securityCode;
  const desencryptedCVV: number = Number(cryptr.decrypt(currentCardCVC));
  console.log(desencryptedCVV);

  if (desencryptedCVV !== Number(cardCVC))
    throw {
      type: "error_card_notActivated",
      message: "Security Code invalid!",
    };

  return await cardRepository.createCardPassword(encryptedPassword, cardId);
}

export async function blockCard(cardId: number, password: string) {
    const currentCard=await defaultFunctions.getCard (cardId)

    defaultFunctions.verifyPassword(currentCard,password)

  if (currentCard.isBlocked) throw { type: "error_block", message: "This card is already blocked", };

  return await cardRepository.blockCard(cardId);
}

export async function unblockCard(cardId: number, password: string) {
    const currentCard=await defaultFunctions.getCard (cardId)
  
    defaultFunctions.verifyPassword(currentCard,password)
  
    if (!currentCard.isBlocked) throw { type: "error_block", message: "This card is already unblocked", };
  
    return await cardRepository.unblockCard(cardId);
  }

  export async function rechargeCard(cardId: number, recharge: number) {
    const currentCard=await defaultFunctions.getCard (cardId)

    return await cardRepository.rechargeCard(cardId,recharge)
  }
