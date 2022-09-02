import * as employeeRepository from '../repositories/empolyeeRepository'
import * as cardRepository from '../repositories/cardRepository'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import Cryptr from 'cryptr'
import * as defaultFunctions from '../generic/functions/functions'

const cryptr = new Cryptr('myTotallySecretKey');

function getExpirationDate (expeditionDate:string){
    const auxArray:Array<string>=expeditionDate.split("/")
    return auxArray[0]+"/"+`${Number(auxArray[1])+5}`
    }
    function getCardName (name:string) {
        const namesArray:Array<string>=name.split(" ")
        const firstName=namesArray.shift()
        const lastName=namesArray.pop()
        const namesFiltered:Array<string> = namesArray.filter( name =>  name.length>=3 ) //Return only the middle names that have more than 3 letters
        const firstLetters:string= namesFiltered.map( name => name.charAt(0)).join(" ")
        return (firstName+ " " + firstLetters+ " " + lastName)
    }

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
    const name=user[0]?.fullName?.toUpperCase()
    const cardNumber:number=Number(faker.finance.creditCardNumber('###############L'))
    const creditCardCVV:string=faker.finance.creditCardCVV()
    const cardExpeditionDate:string=defaultFunctions.getTodayDate()
    const cardExpirationDate:string=getExpirationDate(cardExpeditionDate)
    const encryptedCVV = cryptr.encrypt(creditCardCVV);
    const cardName=getCardName(name)
    return await cardRepository.createCard(employeeId,cardNumber,cardName,creditCardCVV,cardExpirationDate,type)
    // const desencryptedCVV = cryptr.decrypt(encryptedCVV);
}

export async function activateCard (cardId:number,cardCVC:number,password:number) {

}

