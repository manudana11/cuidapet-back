const mongoose = require('mongoose');

const WalkSchema = new mongoose.Schema({
    petsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    speed: {
        type: String,
        required: true
    },
    route: {
        type: Object,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    walkPic: String,
}, { timestamps: true });

const Walk = mongoose.model('Walk', WalkSchema);

module.exports = Walk;
