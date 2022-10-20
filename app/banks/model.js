const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama pemilik harus diisi'],
    },
    bankName: {
        type: String,
        required: [true, 'nameBank harus diisi'],
    },
    noRekening: {
        type: String,
        required: [true, 'noRekening harus diisi'],
    },
});

module.exports = mongoose.model('Bank', bankSchema);