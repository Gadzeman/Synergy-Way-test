const Group = require('../db/groups.schema');

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
      const createGroup = await Group.create( req.body );

      res.json(createGroup);
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
        group.name = body.name;
      }
      // categories & users update not created!!!
      await Group.updateOne({ _id: group._id }, group);
    } catch (e) {
      next(e);
    }
  },
  deleteGroup: async (req, res, next) => {
    try {
      const { group } = req;

      await Group.deleteOne({ _id: group._id });

      res.json({
        message: `Group ${ group.name } deleted`
      });
    } catch (e) {
      next(e);
    }
  }
};
