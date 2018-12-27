const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/game')
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;