const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName: {
            type: String,
            require: [true, 'nama game harus diisi'],
        },
        category: {
            type: String,
            require: [true, 'category harus diisi'],
        },
        thumbnail: {
            type: String,
        },
        coinName: {
            type: String,
            require: [true, 'nama coin harus diisi'],
        },
        coinQuantity: {
            type: String,
            require: [true, 'jumlah coin harus disi'],
        },
        price: {
            type: Number,
        },
    },
    historyPayment: {
        name: {
            type: String,
            require: [true, 'nama harus diisi'],
        },

        type: {
            type: String,
            require: [true, 'type pembayaran harus diisi'],
        },

        bankName: {
            type: String,
            require: [true, 'nama bank harus diisi'],
        },

        noRekening: {
            type: String,
            require: [true, 'nomor rekening harus diisi'],
        },
    },
    name: {
        type: String,
        require: [true, 'nama harus diisi'],
        minLength: 3,
        maxLength: 225,
    },
    accountUser: {
        type: String,
        require: [true, 'nama akun harus diisi'],
        minLength: 3,
        maxLength: 225,
    },
    tax: {
        type: Number,
        default: 0,
    },
    value: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    player: {
        type: mongoose.Types.ObjectId,
        ref: 'Player',
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    historyUser: {
        name: { type: String, require: [true, 'nama player harus diisi'] },
        phoneNumber: {
            type: Number,
            require: [true, 'nama harus diisi'],
            minLength: 3,
            maxLength: 13,
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);