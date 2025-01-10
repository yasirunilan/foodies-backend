import * as Joi from 'joi';
export const fileUploadSignedUrlRequestSchema = Joi.object({
  key: Joi.string().required(),
  fileType: Joi.string().valid('jpeg', 'png', 'jpg').required().messages({
    'any.only': 'File type must be either jpeg or png',
  }),
});
