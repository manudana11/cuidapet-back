const mongoose = require('mongoose');

const PetFoodSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  timesPerDay: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
  },
  hours: {
    type: Object,
    required: true
  }
}, { timestamps: true });

const PetFood = mongoose.model('PetFood', PetFoodSchema);

module.exports = PetFood;