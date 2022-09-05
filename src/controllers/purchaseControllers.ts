import { Response,Request } from "express";
import { purchaseType,onlinePurchaseType } from "../generic/interfaces/interfaces";
import * as purchaseService from '../services/purchaseService'


export async function purchase(req:Request,res:Response) {
    const purchaseData: purchaseType = req.body
    const {cardId,price,password,businessId}=purchaseData
    const result:any = await purchaseService.purchase (cardId,price,password,businessId)
    
    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error_purchase", message:"Purchase could not be completed"}
    }

}

export async function onlinePurchase(req:Request,res:Response) {
    const onlinePurchaseData: onlinePurchaseType = req.body
    const cardId=res.locals.cardId
    const {price,businessId}=onlinePurchaseData
    const result:any = await purchaseService.onlinePurchase(cardId,price,businessId)
    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error_purchase", message:"The online purchase could not be completed"}
    }

}