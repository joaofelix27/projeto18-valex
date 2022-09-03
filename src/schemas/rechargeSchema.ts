import joi from "joi";

const rechargeSchema = joi.object({
  cardId: joi.number().positive().greater(0).required(),
  recharge: joi.number().positive().greater(0).required()
});

export default rechargeSchema;
