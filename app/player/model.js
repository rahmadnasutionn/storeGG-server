const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

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
    username: {
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

playerSchema.path('email').validate(
    async function(value) {
        try {
            const count = await this.model('Player').countDocuments({ email: value });

            return !count;
        } catch (error) {
            throw error;
        }
    },
    (attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
});

module.exports = mongoose.model('Player', playerSchema);