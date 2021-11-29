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
  users: [{
    type: Schema.Types.ObjectId,
    ref: USER
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: CATEGORY
  }]

}, { timestamps: true });

module.exports = model(GROUP, groupsSchema);
