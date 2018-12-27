const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  squares: { type: Array, required: true },
  xIsNext: { type: Array, required: true },

});

module.exports = mongoose.model('Task', GameSchema);