const { User, Group } = require('../models');

module.exports = {
  getGroups: (req, res, next) => {
    try {
      const { groups } = req;

      if ( groups.length === 0 ) {
        res.json({
          message: 'Groups not exist'
        });

        return;
      }

      res.json( groups );
    } catch (e) {
      next(e);
    }
  },
  postGroup: async (req, res, next) => {
    try {
      await Group.create( req.body );
    } catch (e) {
      next(e);
    }
  },
  updateGroup: async (req, res, next) => {
    try {
      const { group } = req;

      const { body } = req;

      if (body.name !== group.name) {
        group.name = body.name;
      }

      if (body.description !== group.description) {
        group.description = body.description;
      }

      await Group.updateOne({ _id: group._id }, group);
    } catch (e) {
      next(e);
    }
  },
  deleteGroup: async (req, res, next) => {
    try {
      const { group } = req;

      await Group.deleteOne({ _id: group._id });
    } catch (e) {
      next(e);
    }
  },
  addUserToGroup: async (req, res, next) => {
    try {
      const { group, user } = req;

      user.groups.push(group._id);

      group.users.push(user._id);

      await Group.updateOne({ _id: group._id }, group);

      await User.updateOne({ _id: user.id }, user);
    } catch (e) {
      next(e);
    }
  },
  deleteUserFromGroup: async (req, res, next) => {
    try {
      const { group, group: { users }, user, user: { groups } } = req;

      const filteredUsers = users.filter( _id => _id.toString() !== user._id.toString() );

      const filteredGroups = groups.filter( _id => _id.toString() !== group._id.toString() );

      await Group.updateOne({ _id: group._id }, { group, users: filteredUsers });

      await User.updateOne({ _id: user._id }, { user, groups: filteredGroups });
    } catch (e) {
      next(e);
    }
  }
};
