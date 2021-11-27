const { Schema, model } = require('mongoose');

const userRoles = require('../config/user.roles.enum');
const { USER, GROUP } = require('../config/db.collections.enum');

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: userRoles.USER,
    enum: Object.values( userRoles )
  },
  groups: [
    {
      group: {
        type: Schema.Types.ObjectId,
        ref: GROUP
      }
    }
  ]
}, { timestamps: true });

module.exports = model(USER, usersSchema);
