import connection from "../config/db";

export function getEmployeeCardsByType (id:number,type:string) {
    return connection.query(`SELECT * FROM cards WHERE "employeeId"=$1 AND type=$2`,[id,type])
}

export function createCard (employeeId:number,number:string,cardHolderName:string,securityCode:string,expirationDate:string,type:string) {
    return connection.query(`INSERT INTO cards ("employeeId",number,"cardholderName","securityCode","expirationDate",type) VALUES ($1,$2,$3,$4,$5,$6) `
    ,[employeeId,number,cardHolderName,securityCode,expirationDate,type])
}