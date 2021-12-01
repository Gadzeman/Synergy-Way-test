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
  getGroup: (req, res, next) => {
    try {
      const { group } = req;

      res.json(group);
    } catch (e) {
      next(e);
    }
  },
  postGroup: async (req, res, next) => {
    try {
      await Group.create( req.body );

      res.json({
        message: 'Group created'
      });
      console.log('Group created');
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

      res.json({
        message: 'Group updated'
      });
      console.log('Group updated');
    } catch (e) {
      next(e);
    }
  },
  deleteGroup: async (req, res, next) => {
    try {
      const { group } = req;

      await Group.deleteOne({ _id: group._id });

      res.json({
        message: 'Group deleted'
      });
      console.log('Group deleted');
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

      res.json({
        message: 'User added to group'
      });
      console.log('User added to group');
    } catch (e) {
      next(e);
    }
  },
  addCategoryToGroup: async (req, res, next) => {
    try {
      const { group, category } = req;

      group.categories.push(category._id);

      await Group.updateOne({ _id: group._id }, group);

      res.json({
        message: 'Category added to group'
      });
      console.log('Category added to group');
    } catch (e) {
      next(e);
    }
  },
  deleteUserFromGroup: async (req, res, next) => {
    try {
      const { group, group: { users }, user, user: { groups } } = req;

      const filteredUsers = users.filter( u => u.email !== user.email );

      const filteredGroups = groups.filter( _id => _id.toString() !== group._id.toString() );

      await Group.updateOne({ _id: group._id }, { group, users: filteredUsers });

      await User.updateOne({ _id: user._id }, { user, groups: filteredGroups });

      res.json({
        message: 'User deleted from group'
      });
      console.log('User deleted rom group');
    } catch (e) {
      next(e);
    }
  },
  deleteCategoryFromGroup: async (req, res, next) => {
    try {
      const { group, group: { categories }, category } = req;

      const filteredCategories = categories.filter( _id => _id.toString() !== category._id.toString() );

      await Group.updateOne({ _id: group._id }, { group, categories: filteredCategories });

      res.json({
        message: 'Category deleted from group'
      });
      console.log('Category deleted from group');
    } catch (e) {
      next(e);
    }
  }
};
