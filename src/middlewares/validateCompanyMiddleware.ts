import { Request, Response, NextFunction } from "express";
import * as companyRepository from "../repositories/companyRepository";

export async function validateCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers;
  const xapikey = authorization["x-api-key"];
  const { rows: companies } = await companyRepository.getCompany(xapikey);
  if (companies.length) {
    res.locals.company = companies[0];
    next()
  } else {
    throw { type: "error_company_notFound", message: "Insert a valid API KEY" };
  }
}
