import connection from "../config/db";

export function getEmployeeCardsByType (id:number,type:string) {
    return connection.query(`SELECT * FROM cards WHERE id=$1 AND type=$2`,[id,type])
}