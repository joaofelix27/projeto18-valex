import connection from "../config/db";

export function getRecharge (id:number) {
    return connection.query(`SELECT "cardId",SUM(amount) as amount FROM recharges WHERE "cardId"=$1 GROUP BY "cardId" ; `,[id])
}   

export function getPurchase (id:number) {
    return connection.query(`SELECT "cardId",SUM(amount) as amount FROM payments WHERE "cardId"=$1 GROUP BY "cardId" ; `,[id])
}   

export function insertPurchase (id:number,businessId:number,amount:number) {
    return connection.query(`INSERT INTO payments ("cardId","businessId",amount) VALUES ($1,$2,$3)`,[id,businessId,amount])
} 