const User = require('../db/users.schema');
const ErrorHandler = require('../errors/error.handler');

module.exports = {
  getAllUsersWithoutParams: async (req, res, next) => {
    try {
      req.users = await User.find({});

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
  ifUserPresent: (req, res, next) => {
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
  ifUserNotPresent: (req, res, next) => {
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
