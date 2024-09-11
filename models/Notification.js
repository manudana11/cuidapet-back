const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    petsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    walkPic: String,
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
