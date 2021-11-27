const router = require('express').Router();

const { groupsMiddleware } = require('../middlewares');
const { groupsController } = require('../controllers');
const { groupsValidator } = require('../validators');

router.get(
  '/',
  groupsMiddleware.getAllGroupsWithoutParams,
  groupsController.getGroups
);
router.post(
  '/',
  groupsMiddleware.validateGroup( groupsValidator.validateGroupBody ),
  groupsMiddleware.getOneGroupByDynamicParams('name'),
  groupsMiddleware.ifGroupPresent,
  groupsController.postGroup
);
router.put(
  '/:user_id',
  groupsMiddleware.getOneGroupByDynamicParams('name'),
  groupsMiddleware.ifGroupPresent,
  groupsMiddleware.getOneGroupByDynamicParams('user_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotPresent,
  groupsController.updateGroup
);
router.delete(
  '/:user_id',
  groupsMiddleware.getOneGroupByDynamicParams('user_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotPresent,
  groupsController.deleteGroup
);

module.exports = router;
