const mongoose = require('mongoose');

const bottleShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: String,
});

const Bottle = mongoose.model('Bottle', bottleShema);

module.exports = Bottle;
