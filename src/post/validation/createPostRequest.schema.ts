import * as Joi from 'joi';
export const createPostRequestSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  pictureKeys: Joi.array().items(Joi.string()).optional(),
  location: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Location name is required',
    }),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
  }).optional(),
});
