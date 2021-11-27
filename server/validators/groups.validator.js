const Joi = require('joi');

module.exports = {
  validateGroupBody: Joi.object({
    name: Joi.string().required().max(18).min(3),
    description: Joi.string().required().max(255)
  }),
  validateGroupNewBody: Joi.object({
    name: Joi.string().max(18).min(3),
    description: Joi.string().max(255)
  })
};
