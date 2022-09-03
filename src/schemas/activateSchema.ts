import joi from "joi";

const activateSchema = joi.object({
  cardId: joi.number().positive().greater(0).required(),
  cardCVC: joi.string().length(3).required(),
  password: joi.string().length(4).required(),
});

export default activateSchema;
