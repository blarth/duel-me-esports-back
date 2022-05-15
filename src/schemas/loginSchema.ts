import joi from "joi";



export const loginSchema = joi.object({
  email: joi.string().required(),
  password : joi.string().required(),
});