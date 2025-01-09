import * as Joi from 'joi';
export const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});
