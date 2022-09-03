import joi from "joi";

const purchaseSchema = joi.object({
  cardId: joi.number().positive().greater(0).required(),  
  password: joi.string().length(4).required(),
  price: joi.number().positive().greater(0).required(),
  businessId:joi.number().positive().greater(0).required()
});

export default purchaseSchema;
