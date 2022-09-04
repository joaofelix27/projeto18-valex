import connection from "../config/db";

export function getTransactions (id:number) {
    return connection.query(`SELECT p.id as id,"cardId","businessId",b.name as businessName 
    ,p.timestamp,amount FROM payments p JOIN businesses b ON b.id="businessId" WHERE "cardId"=$1; `,[id])
}   

export function getRecharges (id:number) {
    return connection.query(`SELECT * FROM recharges WHERE "cardId"=$1;`,[id])
}   
