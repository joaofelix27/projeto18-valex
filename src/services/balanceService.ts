import * as defaultFunctions from "../generic/functions/functions";
import * as balanceRepository from '../repositories/balanceRepository'


export async function balance(cardId:number) {
    const balance = await defaultFunctions.getBalance(cardId)
    const {rows:recharges} = await balanceRepository.getRecharges(cardId)
   const {rows:transactions} = await balanceRepository.getTransactions(cardId)

   const resultObject = {
       balance:balance,
       transactions,
       recharges

   }

  return resultObject
}