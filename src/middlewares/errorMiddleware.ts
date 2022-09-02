import {Request,Response,NextFunction} from 'express' 
export default function errorHandler (error:any,req:Request,res:Response,next:NextFunction) {
    if (error.type === "error_company_notFound") return res.status(404).send({ message: error.message });
    if (error.type === "error_card_notCreated") return res.status(401).send({ message: error.message });
    if (error.type === "error_card_notActivated") return res.status(401).send({ message: error.message });

	return res.status(500).send(error);
}
