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
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
      },
      message: props => `${props.value} no es una hora válida. Debe ser en formato HH:mm.`
    }
  },
  endDate: {
    type: String,
    validate: {
      validator: function (value) {
        return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
      },
      message: props => `${props.value} no es una hora válida. Debe ser en formato HH:mm.`
    }
  },
  hours: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const PetFood = mongoose.model('PetFood', PetFoodSchema);

module.exports = PetFood;