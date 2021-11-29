const ErrorHandler = require('../errors/error.handler');
const { Category } = require('../models');

module.exports = {
  getAllCategoriesWithoutParams: async (req, res, next) => {
    try {
      req.categories = await Category.find({});

      next();
    } catch (e) {
      next(e);
    }
  },
  getCategoryByDynamicParams:
    (paramName, searchIn = 'body', dbField = paramName) =>
      async (req, res, next) =>
      {
        try {
          req.category = await Category.findOne({ [dbField]: req[searchIn][paramName] });

          next();
        } catch (e) {
          next(e);
        }
      },
  ifCategoryExist: (req, res, next) => {
    try {
      const { category } = req;

      if ( category ) {
        throw new ErrorHandler(400, 'Category already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  ifCategoryNotExist: (req, res, next) => {
    try {
      const { category } = req;

      if ( !category ) {
        throw new ErrorHandler(404, 'Category not found');
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  validateCategory: ( validator ) => (req, res, next) => {
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
