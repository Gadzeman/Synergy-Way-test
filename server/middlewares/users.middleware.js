const ErrorHandler = require('../errors/error.handler');
const { User } = require('../models');
const { GROUP } = require('../config/db.collections.enum');

module.exports = {
  getAllUsersWithoutParams: async (req, res, next) => {
    try {
      req.users = await User
        .find({}, { email: 1, role: 1 })
        .populate( GROUP , { name: 1, description: 1 } );

      next();
    } catch (e) {
      next(e);
    }
  },
  getOneUserByDynamicParams:
    (paramName, searchIn = 'body', dbField = paramName) =>
      async (req, res, next) =>
      {
        try {
          req.user = await User.findOne({ [dbField]: req[searchIn][paramName] });

          next();
        } catch (e) {
          next(e);
        }
      },
  ifUserExist: (req, res, next) => {
    try {
      const { user } = req;

      if ( user ) {
        throw new ErrorHandler(400, 'User with this email already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserNotExist: (req, res, next) => {
    try {
      const { user } = req;

      if ( !user ) {
        throw new ErrorHandler(404, 'User not found');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  validateUser: ( validator ) => (req, res, next) => {
    try {
      const { error } = validator.validate( req.body );

      if ( error ) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
