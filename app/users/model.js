const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus diisi'],
    },
    name: {
        type: String,
        require: [true, 'Nama harus disi'],
    },
    password: {
        type: String,
        require: [true, 'Password harus diisi'],
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
    phoneNumber: {
        type: String,
        require: [true, 'Nomor telepon harus diisi'],
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);