const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  medicationPic: String,
});

const Medication = mongoose.model('Medication', MedicationSchema);

module.exports = Medication;
