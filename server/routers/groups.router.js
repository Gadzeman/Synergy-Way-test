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
  '/add/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  usersMiddleware.getOneUserByDynamicParams('email'),
  usersMiddleware.ifUserNotExist,
  groupsMiddleware.ifUserExistInGroup,
  groupsController.addUserToGroup
);
router.delete(
  '/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  groupsMiddleware.ifUsersExistInGroup,
  groupsController.deleteGroup
);
router.delete( // delete user from group
  '/delete/:group_id',
  groupsMiddleware.getOneGroupByDynamicParams('group_id', 'params', '_id'),
  groupsMiddleware.ifGroupNotExist,
  usersMiddleware.getOneUserByDynamicParams('email'),
  usersMiddleware.ifUserNotExist,
  groupsMiddleware.ifUserNotExistInGroup,
  groupsController.deleteUserFromGroup
);

module.exports = router;
