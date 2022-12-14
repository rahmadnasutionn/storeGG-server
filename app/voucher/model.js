const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama game harus diisi'],
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
    },
    thumbnail: {
        type: String,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    nominals: [{
        type: mongoose.Types.ObjectId,
        ref: 'Nominal',
    }, ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Voucher', voucherSchema);