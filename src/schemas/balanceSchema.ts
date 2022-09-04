import joi from "joi";

const balanceSchema = joi.object({
  cardId: joi.number().positive().greater(0).required()
});

export default balanceSchema;
