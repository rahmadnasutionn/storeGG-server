const Player = require('./model');
const Voucher = require('../voucher/model');
const Category = require('../categories/model');

module.exports = {
    landingPage: async(req, res) => {
        try {
            const voucher = await Voucher.find().select('_id name status thumbnail').populate('category');

            res.status(200).json({
                data: voucher,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Terjadi kesalahan pada server',
            });
        }
    },

    detailPage: async(req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOne({ _id: id }).populate('category').populate('nominals').populate('user', '_id phoneNumber name');

            if (!voucher) {
                return res.status(404).json({
                    message: 'voucher game tidak di temukan. !',
                });
            }

            res.status(200).json({
                data: voucher,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Terjadi kesalahan pada server',
            });
        }
    },

    category: async(req, res) => {
        try {
            const category = await Category.find();

            res.status(200).json({
                data: category,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Terjadi kesalahan pada server',
            });
        }
    },
};