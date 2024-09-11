const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    petsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    spent: [{
        name: String,
        description: String,
        amount: Number,
    }]
}, { timestamps: true });

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
