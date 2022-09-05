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
  if (error.type === "error_card_notCreated")
    return res.status(401).send({ message: error.message });
  if (error.type === "error_card_notActivated")
    return res.status(401).send({ message: error.message });
  if (error.type === "error_block")
    return res.status(409).send({ message: error.message });
  if (error.type === "error_business")
    return res.status(404).send({ message: error.message });
  if (error.type === "error_purchase")
    return res.status(404).send({ message: error.message });

  return res.status(500).send(error.message);
}
