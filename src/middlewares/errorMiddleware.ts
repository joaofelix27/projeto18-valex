import { Request, Response, NextFunction } from "express";
export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "error_notFound")
    return res.status(404).send({ message: error.message });
  if (error.type === "error_badRequest")
    return res.status(400).send({ message: error.message });
  if (error.type === "error_unAuthorized")
    return res.status(401).send({ message: error.message });
  if (error.type === "error_conflict")
    return res.status(409).send({ message: error.message });
    if (error.type === "error_preCondition")
    return res.status(412).send({ message: error.message });

  return res.status(500).send(error.message);
}
