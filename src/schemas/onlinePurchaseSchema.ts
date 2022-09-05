import joi from "joi";

const onlinePurchaseSchema = joi.object({
  number: joi.string().length(16).required(),
  name: joi.string().required(),
  expirationDate: joi.string().length(5).required(),
  cardCVC:joi.string().length(3).required(),
  price: joi.number().positive().greater(0).required(),
  businessId:joi.number().positive().greater(0).required()
});

export default onlinePurchaseSchema;
