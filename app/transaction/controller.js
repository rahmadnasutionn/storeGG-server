const Transaction = require('./model');

const index = async(req, res, next) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');

        const alert = {
            message: alertMessage,
            status: alertStatus,
        };
        const transaction = await Transaction.find().populate('player');

        res.render('admin/transaction/view_transaction', {
            transaction,
            alert,
            name: req.session.user.name,
            title: 'Halaman transaction',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/transaction');
        next(error);
    }
};

const actionStatus = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.query;

        await Transaction.findByIdAndUpdate({ _id: id }, { status }, { new: true, runValidators: true });

        req.flash('alertMessage', 'Berhasil ubah status');
        req.flash('alertStatus', 'success');
        res.redirect('/transaction');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/transaction');
        next(error);
    }
};

module.exports = {
    index,
    actionStatus,
};