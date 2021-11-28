const { User, Group } = require('../models');

module.exports = {
  getUsers: (req, res, next) => {
    try {
      const { users } = req;

      if ( users.length === 0 ) {
        res.json({
          message: 'Users not exist'
        });

        return;
      }

      res.json( users );
    } catch (e) {
      next(e);
    }
  },
  postUser: async (req, res, next) => {
    try {
      await User.create( req.body );
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { user } = req;

      const { body } = req;

      if ( user.email !== body.email ) {
        user.email = body.email;
      }

      if ( user.role !== body.role ) {
        user.role = body.role;
      }

      await User.updateOne({ _id: user._id }, user);
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { user } = req;

      for (const group_id of user.groups) {
        await Group.updateOne({ _id: group_id }, { $pull: { users: user._id } });
      }

      await User.deleteOne({ _id: user._id });
    } catch (e) {
      next(e);
    }
  }
};
