import connection from "../config/db";

export function getEmployee (id:number) {
    return connection.query(`SELECT * FROM employees WHERE id=$1`,[id])
}