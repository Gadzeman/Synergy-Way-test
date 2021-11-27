const { Schema, model } = require('mongoose');

const { USER, GROUP, CATEGORY } = require('../config/db.collections.enum');

const groupsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: CATEGORY
  },
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: USER
      }
    }
  ]
}, { timestamps: true });

module.exports = model(GROUP, groupsSchema);
