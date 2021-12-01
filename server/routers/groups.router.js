const router = require('express').Router();

const { groupsMiddleware, usersMiddleware, categoriesMiddleware } = require('../middlewares');
const { groupsController } = require('../controllers');
const { groupsValidator } = require('../validators');

router.get(
  '/',
  groupsMiddleware.getAllGroupsWithoutParams,
  groupsController.getGroups
);
router.get(
  '/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  groupsController.getGroup
);
router.post(
  '/',
  groupsMiddleware.validateGroup( groupsValidator.validateGroupBody ),
  groupsMiddleware.getOneGroupByDynamicParams('name'),
  groupsMiddleware.ifGroupExist,
  groupsController.postGroup
);
router.put(
  '/:group_id',
  groupsMiddleware.validateGroup( groupsValidator.validateGroupNewBody ),
  groupsMiddleware.getOneGroupByDynamicParams('name'),
  groupsMiddleware.ifGroupExist,
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  groupsController.updateGroup
);
router.put( // add user to group
  '/add/user/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  usersMiddleware.getOneUserByDynamicParams('email'),
  usersMiddleware.ifUserNotExist,
  groupsMiddleware.ifUserExistInGroup,
  groupsController.addUserToGroup
);
router.put(
  '/add/category/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  categoriesMiddleware.getCategoryByDynamicParams('name'),
  categoriesMiddleware.ifCategoryNotExist,
  groupsController.addCategoryToGroup
);
router.delete(
  '/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  groupsMiddleware.ifUsersExistInGroup,
  groupsController.deleteGroup
);
router.delete( // delete user from group
  '/delete/user/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  usersMiddleware.getOneUserByDynamicParams('email'),
  usersMiddleware.ifUserNotExist,
  groupsMiddleware.ifUserNotExistInGroup,
  groupsController.deleteUserFromGroup
);
router.delete(
  '/delete/category/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  categoriesMiddleware.getCategoryByDynamicParams('name'),
  categoriesMiddleware.ifCategoryNotExist,
  groupsController.deleteCategoryFromGroup
);

module.exports = router;
