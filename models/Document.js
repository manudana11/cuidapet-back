const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  documentFile: {
    type: String,
    required: true
  },
});

const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;
