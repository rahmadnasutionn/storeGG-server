const mongoose = require('mongoose');

const nominalSchema = mongoose.Schema({
    coinQuantity: {
        type: Number,
        default: 0,
    },
    coinName: {
        type: String,
        required: [true, 'Nama coin harus diisi'],
    },
    price: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Nominal', nominalSchema);