const ErrorHandler = require('../errors/error.handler');
const { Group } = require('../models');
const { USER, CATEGORY } = require('../config/db.collections.enum');

module.exports = {
  getAllGroupsWithoutParams: async (req, res, next) => {
    try {
      req.groups = await Group
        .find({}, { name: 1, description: 1 })
        .populate( USER, { email: 1, role: 1 } )
        .populate( CATEGORY, { name: 1 } );

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
          req.group = await Group.findOne({ [dbField]: req[searchIn][paramName] }).populate( USER );

          next();
        } catch (e) {
          next(e);
        }
      },
  ifGroupExist: (req, res, next) => {
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
  ifGroupNotExist: (req, res, next) => {
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
  ifUsersExistInGroup: (req, res, next) => {
    try {
      const { group } = req;

      if ( group.users.length !== 0 ) {
        throw new ErrorHandler(403, 'If users exist you can not delete the group');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserExistInGroup: (req, res, next) => {
    try {
      const { user, group } = req;

      const foundUser = group.users.find( u => u.email === user.email );

      if ( foundUser ) {
        throw new ErrorHandler(400, 'User already exist in this group');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifUserNotExistInGroup: (req, res, next) => {
    try {
      const { user, group } = req;

      const foundUser = group.users.find( u => u.email === user.email );

      if ( !foundUser ) {
        throw new ErrorHandler(400, 'User not exist in this group');
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
