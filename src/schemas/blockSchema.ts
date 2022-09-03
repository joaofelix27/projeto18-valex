import joi from "joi";

const blockSchema = joi.object({
  cardId: joi.number().positive().greater(0).required(),
  password: joi.string().length(4).required(),
});

export default blockSchema;
