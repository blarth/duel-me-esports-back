import joi from "joi";



export const recommendationSchema = joi.object({
  name: joi.string().required(),
  youtubeLink: joi.string().required(),
});
