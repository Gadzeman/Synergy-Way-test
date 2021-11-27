const Group = require('../db/groups.schema');
const ErrorHandler = require('../errors/error.handler');
const { USER } = require('../config/db.collections.enum');

module.exports = {
  getAllGroupsWithoutParams: async (req, res, next) => {
    try {
      req.groups = await Group
        .find({}, { name: 1, description: 1 })
        .populate( `${USER}.user`, { email: 1, role: 1 } );

      next();
    } catch (e) {
      next(e);
    }
  },
  getOneGroupByDynamicParams:
    (paramName, searchIn = 'body', dbField = paramName) =>
      async (req, res, next) =>
      {
        try {
          req.group = await Group.findOne({ [dbField]: req[searchIn][paramName] });

          next();
        } catch (e) {
          next(e);
        }
      },
  ifGroupPresent: (req, res, next) => {
    try {
      const { group } = req;

      if ( group ) {
        throw new ErrorHandler(400, 'Group with this name already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifGroupNotPresent: (req, res, next) => {
    try {
      const { group } = req;

      if ( !group ) {
        throw new ErrorHandler(404, 'Group not found');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  validateGroup: ( validator ) => (req, res, next) => {
    try {
      const { error } = validator.validate(req.body);

      if ( error ) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
