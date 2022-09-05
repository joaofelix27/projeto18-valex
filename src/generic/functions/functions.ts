import dayjs from "dayjs"
import bcrypt from "bcrypt";
import * as cardRepository from "../../repositories/cardRepository";
import * as purchaseRepository from "../../repositories/purchaseRepository";
import * as businessRepository from "../../repositories/businessRepository";
import { getBusinessType, isExpiredType } from "../types/types";

export const getTodayDate = () => {
    return dayjs().format('MM/YY')
}
export function verifyPassword(currentCard:any,password:string) {
    const verifyPassword = bcrypt.compareSync(
      password,
      currentCard?.password
    );
    if (!verifyPassword) throw { type: "error_unAuthorized", message: "Wrong password!" };
  }

 export async function getCard(cardId: number) {
    const { rows: card } = await cardRepository.getCard(cardId);
    const currentCard:any = card[0];
    return currentCard
  }

export function getExpirationDate(expeditionDate: string) {
  const auxArray: Array<string> = expeditionDate.split("/");
  return auxArray[0] + "/" + `${Number(auxArray[1]) + 5}`;
}
export function getCardName(name: string) {
  const namesArray: Array<string> = name.split(" ");
  const firstName = namesArray.shift();
  const lastName = namesArray.pop();
  const namesFiltered: Array<string> = namesArray.filter(
    (name) => name.length >= 3
  ); //Return only the middle names that have more than 3 letters
  const firstLetters: string = namesFiltered
    .map((name) => name.charAt(0))
    .join(" ");
  return firstName + " " + firstLetters + " " + lastName;
}

export async function enoughBalance (id:number,price:number) {
  const { rows: recharges } = await  purchaseRepository.getRecharge(id);
  if(recharges.length){
    const rechargesTotal:any = recharges[0]?.amount;
    const { rows: purchases } = await  purchaseRepository.getPurchase(id);
    if (!purchases.length && price<=rechargesTotal) return true
    const purchasesTotal:any = purchases[0]?.amount;
    const balance = rechargesTotal-purchasesTotal-price
    if(balance>=0) return true
  }
  return false

}
export async function getBalance (id:number) {
  const { rows: recharges } = await  purchaseRepository.getRecharge(id);
  if (!recharges.length) return 0
  const rechargesTotal:any = recharges[0]?.amount;
  const { rows: purchases } = await  purchaseRepository.getPurchase(id);
  const purchasesTotal:any = purchases[0]?.amount;
  if (!purchases.length) return rechargesTotal
  const balance = rechargesTotal-purchasesTotal
  return balance

}
export const isExpired :(isExpiredType)= async (card) => {
const todayDate= getTodayDate().split("/")
const expirationDate=card[0]?.expirationDate.split("/")
if (expirationDate[1]>todayDate[1]) return false
else if (expirationDate[1]===todayDate[1] && expirationDate[0]>=todayDate[0] ) return false
return true
}

export const getBusiness : (getBusinessType) =  async (businessId,currentCard) => {
  const { rows: businesses } = await businessRepository.getBusiness(businessId);
  if (!businesses.length) throw { type: "error_badRequest", message: "Insert a valid businessId" };
  const currentBusiness:any=businesses[0]
  if(currentCard.type!==currentBusiness.type) throw { type: "error_conflict", message: "The card type does not match the business type" };
}