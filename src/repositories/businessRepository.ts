import connection from "../config/db";

export function getBusiness (id:number) {
    return connection.query(`SELECT * FROM businesses WHERE id=$1  `,[id])
}   