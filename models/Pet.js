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
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  noteIds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  },
  vaccinations: [{
    medications: [{
      type: mongoose.Schema.Types.ObjectId, //Añadir en medications el campo 'type'
      ref: 'Medication'
    }],
    date: Date,
    completed: Boolean
  }],
  feedingSchedule: {
    type: String,
    required: true
  },
  lastFed: Date,
  petMedicationsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PetMedications'
  }],
  petFoodId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PetFood'
  }],
  walkIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Walk'
  }],
  documentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
}, { timestamps: true });

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
