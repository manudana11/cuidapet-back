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
        required: false
    },
    route: {
        type: Object,
        required: false
    },
    rating: {
        type: String,
        required: false
    },
    walkPic: String,
}, { timestamps: true });

const Walk = mongoose.model('Walk', WalkSchema);

module.exports = Walk;
