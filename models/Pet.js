const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: false
  },
  petPic: String,
  age: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vaccinations: [{
    vaccine: String,
    date: Date,
    completed: Boolean
  }],
  feedingSchedule: {
    type: String,
    required: true
  },
  lastFed: {
    type: Date
  }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
