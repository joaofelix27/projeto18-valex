import { Response,Request } from "express";
import * as cardService from '../services/cardService'

export async function createCard(req:Request,res:Response) {
    const cardInfo: {employeeId:number,type:string} = req.body
    const result:any = await cardService.createCard(cardInfo.employeeId,cardInfo.type)

    if (result) {
    return res.sendStatus(201)
    } else {
        throw {type:"error_card_notCreated", message:"Deu ruim papai"}
    }

}