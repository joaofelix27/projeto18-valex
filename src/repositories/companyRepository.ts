import connection from "../config/db";

export function getCompany (xapikey:any) {
    return connection.query(`SELECT * FROM companies WHERE "apiKey"=$1  `,[xapikey])
}   