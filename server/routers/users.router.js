const router = require('express').Router();

const { usersMiddleware } = require('../middlewares');
const { usersController } = require('../controllers');
const { usersValidator } = require('../validators');

router.get(
  '/',
  usersMiddleware.getAllUsersWithoutParams,
  usersController.getUsers
);
router.post(
  '/',
  usersMiddleware.validateUser( usersValidator.validateUserBody ),
  usersMiddleware.getOneUserByDynamicParams('email'),
  usersMiddleware.ifUserExist,
  usersController.postUser
);
router.put(
  '/:user_id',
  usersMiddleware.validateUser( usersValidator.validateUserRoles ),
  usersMiddleware.getOneUserByDynamicParams('email'),
  usersMiddleware.ifUserExist,
  usersMiddleware.getOneUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.ifUserNotExist,
  usersController.updateUser
);
router.delete(
  '/:user_id',
  usersMiddleware.getOneUserByDynamicParams('user_id', 'params', '_id'),
  usersMiddleware.ifUserNotExist,
  usersController.deleteUser
);

module.exports = router;
