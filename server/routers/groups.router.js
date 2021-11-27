const router = require('express').Router();

const { groupsMiddleware, usersMiddleware } = require('../middlewares');
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
  '/:group_id',
  groupsMiddleware.validateGroup( groupsValidator.validateGroupNewBody ),
  groupsMiddleware.getOneGroupByDynamicParams('name'),
  groupsMiddleware.ifGroupPresent,
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotPresent,
  groupsController.updateGroup
);
router.put(
  '/add/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotPresent,
  usersMiddleware.getOneUserByDynamicParams('email'),
  usersMiddleware.ifUserNotPresent,
  groupsController.addUser
);
router.delete(
  '/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotPresent,
  groupsController.deleteGroup
);

module.exports = router;
