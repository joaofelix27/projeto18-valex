import { Response,Request } from "express";
import { purchaseType } from "../generic/interfaces/interfaces";
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
