import * as employeeRepository from '../repositories/empolyeeRepository'

export async function createCard(employeeId:number,type:string) {
    const {rows:user}=await employeeRepository.getEmployee(employeeId)
    const cardTypes:any={groceries:true, restaurant:true, transport:true, education:true, health:true}
    if(!cardTypes[type]){
        throw {type:"error_card_notCreated", message:"This type of card is not available"}
    }
    if(user.length<1){
        throw {type:"error_card_notCreated", message:"Employee id is not registred in the database yet"}
    }
    return user[0]
}