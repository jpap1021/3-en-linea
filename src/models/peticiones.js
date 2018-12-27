const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  data: { type: String, required: true },

});

module.exports = mongoose.model('Task', GameSchema);