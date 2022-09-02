import joi from "joi";

const activateSchema = joi.object({
  cardId: joi.string().required(),
  cardCVC: joi.string().required(),
  password: joi.string().length(4).required(),
});

export default activateSchema;
