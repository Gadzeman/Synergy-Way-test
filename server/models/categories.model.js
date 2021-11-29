const { Schema, model } = require('mongoose');

const { CATEGORY } = require('../config/db.collections.enum');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = model(CATEGORY, categorySchema);
