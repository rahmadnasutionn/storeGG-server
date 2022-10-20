const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus diisi'],
    },
    name: {
        type: String,
        require: [true, 'Nama harus disi'],
        minLength: 3,
        maxLength: 40,
    },
    name: {
        type: String,
        require: [true, 'Nama harus disi'],
        minLength: 3,
        maxLength: 40,
    },
    password: {
        type: String,
        require: [true, 'Password harus diisi'],
        maxLength: [40, 'Panjang password max 40'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin',
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
    },
    avatar: {
        type: String,
    },
    fileName: { type: String },

    phoneNumber: {
        type: String,
        require: [true, 'Nomor telepon harus diisi'],
        minLength: [9, 'Panjang nomer telepone 9'],
        maxLength: [13, 'Panjang password max 13'],
    },
    favorite: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);