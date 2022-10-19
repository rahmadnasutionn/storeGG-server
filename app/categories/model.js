const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama category harus diisi'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);