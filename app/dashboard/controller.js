const Transaction = require('../transaction/model');
const Player = require('../player/model');
const Voucher = require('../voucher/model');
const Category = require('../categories/model');

const index = async(req, res, next) => {
    try {
        const transaction = await Transaction.countDocuments();
        const player = await Player.countDocuments();
        const voucher = await Voucher.countDocuments();
        const category = await Category.countDocuments();
        res.render('admin/dashboard/view_dashboard', {
            name: req.session.user.name,
            title: 'Halaman dashboard',
            count: {
                transaction,
                player,
                voucher,
                category,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index,
};