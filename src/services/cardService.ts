import * as employeeRepository from '../repositories/empolyeeRepository'
import * as cardRepository from '../repositories/cardRepository'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import Cryptr from 'cryptr'

const cryptr = new Cryptr('myTotallySecretKey');

export async function createCard(employeeId:number,type:string) {
    const cardTypes:any={groceries:true, restaurant:true, transport:true, education:true, health:true}
    if(!cardTypes[type]){
        throw {type:"error_card_notCreated", message:"This type of card is not available"}
    }
    const {rows:user}=await employeeRepository.getEmployee(employeeId)
    const {rows:cards}=await cardRepository.getEmployeeCardsByType(employeeId,type)
    if(user.length<1){
        throw {type:"error_card_notCreated", message:"Employee id is not registred in the database yet"}
    }
    if(cards.length>0){
        throw {type:"error_card_notCreated", message:"Employee already has a card with this type"}
    }
    const creditCardNumber:string=faker.finance.creditCardNumber('###############L')
    const creditCardCVV:string=faker.finance.creditCardCVV()
    const creditCardExpeditionDate:string=dayjs().format('MM/YY')
    const auxArray:Array<string>=creditCardExpeditionDate.split("/")
    const creditCardExpirationDate:string=auxArray[0]+"/"+`${Number(auxArray[1])+5}`
    const encryptedCVV = cryptr.encrypt(creditCardCVV);
    // const desencryptedCVV = cryptr.decrypt(encryptedCVV);

    return user[0]
}