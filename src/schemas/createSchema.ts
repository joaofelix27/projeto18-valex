import joi from "joi";

const createSchema = joi.object({
  employeeId: joi.number().positive().greater(0).required(),
  type: joi.string().required(),
});

export default createSchema;
