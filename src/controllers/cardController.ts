import { Response,Request } from "express";
import { activateType, blockType, rechargeType } from "../generic/interfaces/interfaces";
import * as cardService from '../services/cardService'

interface createType  {
    employeeId:number,type:string
}

export async function createCard(req:Request,res:Response) {
    const createData: createType = req.body
    const {employeeId,type}=createData
    const result:any = await cardService.createCard(employeeId,type)
    
    if (result) {
    return res.status(201).
    send(`The employee card with id ${result.currentId} was created and its security code is ${result.creditCardCVV}. 
    It is of utmost importance to keep this data save because it will be required to further uses!`)
    } else {
        throw {type:"error", message:"Card could not be created"}
    }

}


export async function activateCard(req:Request,res:Response) {
    const activationData: activateType = req.body
    const {cardId,cardCVC,password}=activationData
    const result:any = await cardService.activateCard(cardId,cardCVC,password)
    
    if (result) {
    return res.sendStatus(200)
    } else {
        throw {type:"error", message:"Card could not be activated"}
    }

}
export async function blockCard(req:Request,res:Response) {
    const blockData: blockType = req.body
    const {cardId,password}=blockData
    const result:any = await cardService.blockCard(cardId,password)
    
    if (result) {
    return res.sendStatus(200)
    } else {
        throw {type:"error", message:"Card could not be blocked"}
  
}
}

export async function unblockCard(req:Request,res:Response) {
    const unblockData: blockType = req.body
    const {cardId,password}=unblockData
    const result:any = await cardService.unblockCard(cardId,password)
    
    if (result) {
    return res.sendStatus(200)
    } else {
        throw {type:"error_card_not(Un)Blocked", message:"Card could not be unblocked"}
    }

}

export async function rechargeCard(req:Request,res:Response) {
    const rechargeData: rechargeType = req.body
    const {cardId,recharge}=rechargeData
    const result:any = await cardService.rechargeCard(cardId,recharge)
    
    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error_card_notRecharged", message:"Card could not be recharged"}
    }

}