const Joi = require('joi');

const userObject = Joi.object({
  user: Joi.string().max(24).min(24) // That means an id;
});

module.exports = {
  validateGroupBody: Joi.object({
    name: Joi.string().required().max(18).min(3),
    description: Joi.string().required().max(255),
    users: Joi.array().items(userObject)
  })
};
