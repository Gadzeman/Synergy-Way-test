const Joi = require('joi');

module.exports = {
  validateCategoryBody: Joi.object({
    name: Joi.string().required().min(3).max(18)
  })
};
