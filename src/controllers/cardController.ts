import { Response,Request } from "express";
import * as cardService from '../services/cardService'
import {activateType} from '../middlewares/validateCardMiddleware'

interface createType  {
    employeeId:number,type:string
}

export async function createCard(req:Request,res:Response) {
    const createData: createType = req.body
    const {employeeId,type}=createData
    const result:any = await cardService.createCard(employeeId,type)
    
    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error_card_notCreated", message:"Card could not be created"}
    }

}


export async function activateCard(req:Request,res:Response) {
    const activationData: activateType = req.body
    const {cardId,cardCVC,password}=activationData
    const result:any = await cardService.activateCard(cardId,cardCVC,password)
    
    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error_card_notCreated", message:"Card could not be created"}
    }

}