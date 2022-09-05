import connection from "../config/db";

export function getEmployeeCardsByType (id:number,type:string) {
    return connection.query(`SELECT * FROM cards WHERE "employeeId"=$1 AND type=$2`,[id,type])
}

export function createCard (employeeId:number,number:number,cardHolderName:string,securityCode:string,expirationDate:string,type:string) {
    return connection.query(`INSERT INTO cards ("employeeId",number,"cardholderName","securityCode","expirationDate",type) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id `
    ,[employeeId,number,cardHolderName,securityCode,expirationDate,type])
}

export function getCard (id:number) {
    return connection.query(`SELECT * FROM cards WHERE id=$1`,[id])
}

export function getCardByNumber (number:string) {
    return connection.query(`SELECT * FROM cards WHERE number=$1`,[number])
}

export function createCardPassword (password:string,id:number) {
    return connection.query(`UPDATE cards SET password=$1 WHERE id=$2`,[password,id])
}

export function blockCard (id:number) {
    return connection.query(`UPDATE cards SET "isBlocked"=true WHERE id=$1`,[id])
}
export function unblockCard (id:number) {
    return connection.query(`UPDATE cards SET "isBlocked"=false WHERE id=$1`,[id])
}

export function rechargeCard (id:number,recharge:number) {
    return connection.query(`INSERT INTO recharges ("cardId",amount) VALUES ($1,$2)`,[id,recharge])
}