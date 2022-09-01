import {Request,Response,NextFunction} from 'express' 
export default function errorHandler (error:any,req:Request,res:Response,next:NextFunction) {
    if (error.type === "error_company_notFound") return res.status(404).send({ message: error.message });

	return res.sendStatus(500);
}
