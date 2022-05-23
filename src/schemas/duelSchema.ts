import joi from "joi";



export const duelSchema = joi.object({
  teamId: joi.number().required(),
  bet : joi.number().min(1).required(),
});