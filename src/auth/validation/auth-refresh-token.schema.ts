import * as Joi from 'joi';
export const authRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
