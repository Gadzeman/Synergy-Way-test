const Joi = require('joi');

const userRoles = require('../config/user.roles.enum');

module.exports = {
  validateUserBody: Joi.object({
    email: Joi.string().required(),
    role: Joi.valid( ...Object.values(userRoles) ).default( userRoles.USER )
  }),
  validateUserRoles: Joi.object({
    email: Joi.string(),
    role: Joi.valid( ...Object.values(userRoles) )
  })
};
