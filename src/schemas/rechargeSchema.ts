import joi from "joi";

const rechargeSchema = joi.object({
  cardId: joi.string().required(),
  recharge: joi.number().positive().greater(0).required()
});

export default rechargeSchema;
