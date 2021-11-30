const { Category } = require('../models');

module.exports = {
  getCategories: (req, res, next) => {
    try {
      const { categories } = req;

      if ( categories.length === 0 ) {
        res.json({
          message: 'Categories not exist'
        });
      }

      res.json( categories );
    } catch (e) {
      next(e);
    }
  },
  postCategory: async (req, res, next) => {
    try {
      await Category.create(req.body);

      res.json({
        message: 'Category created'
      });
    } catch (e) {
      next(e);
    }
  }
};
