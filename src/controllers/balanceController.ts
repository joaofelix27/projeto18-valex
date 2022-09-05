import { Response,Request } from "express";
import {balanceType } from "../generic/interfaces/interfaces";
import * as balanceService from '../services/balanceService'


export async function balance(req:Request,res:Response) {
    const balanceData: balanceType = req.body
    const {cardId}=balanceData
    const result:any = await balanceService.balance(cardId)
    
    if (result) {
    return res.status(200).send({balance:result})
    } else {
        throw {type:"error", message:"It was not possible to get your balance"}
    }

}
