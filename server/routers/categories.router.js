const router = require('express').Router();

const { categoriesMiddleware } = require('../middlewares');
const { categoriesController } = require('../controllers');
const { categoriesValidator } = require('../validators');

router.get(
  '/',
  categoriesMiddleware.getAllCategoriesWithoutParams,
  categoriesController.getCategories
);
router.post(
  '/',
  categoriesMiddleware.validateCategory( categoriesValidator.validateCategoryBody ),
  categoriesMiddleware.getCategoryByDynamicParams('name'),
  categoriesMiddleware.ifCategoryExist,
  categoriesController.postCategory
);

module.exports = router;
