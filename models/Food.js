const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  foodPic: String,
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
