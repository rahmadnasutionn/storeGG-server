const Payment = require('./model');
const Bank = require('../banks/model');

const index = async(req, res, next) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');

        const alert = {
            message: alertMessage,
            status: alertStatus,
        };
        const payment = await Payment.find().populate('banks');
        res.render('admin/payment/view_payment', {
            payment,
            alert,
            name: req.session.user.name,
            title: 'Halaman Payments',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
        next(error);
    }
};

const createView = async(req, res, next) => {
    try {
        const banks = await Bank.find();
        res.render('admin/payment/create', {
            banks,
            name: req.session.user.name,
            title: 'Halaman tambah payment',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
        next(error);
    }
};

const viewEdit = async(req, res, next) => {
    try {
        const { id } = req.params;

        const payment = await Payment.findOne({
            _id: id,
        }).populate('banks');
        const banks = await Bank.find();

        res.render('admin/payment/edit', {
            payment,
            banks,
            name: req.session.user.name,
            title: 'Halaman edit payment',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/payment');
        next(error);
    }
};

const actionCreate = async(req, res, next) => {
    try {
        const { banks, type } = req.body;

        let payment = await Payment({ banks, type });

        await payment.save();

        req.flash('alertMessage', 'Berhasil menambah payment');
        req.flash('alertStatus', 'success');

        res.redirect('/payment');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
        next(error);
    }
};

const actionEdit = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { banks, type } = req.body;

        await Payment.findOneAndUpdate({
            _id: id,
        }, { banks, type }, { new: true, runValidators: true });

        req.flash('alertMessage', 'Berhasil ubah payment');
        req.flash('alertStatus', 'success');

        res.redirect('/payment');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
        next(error);
    }
};

const actionDelete = async(req, res, next) => {
    try {
        const { id } = req.params;

        await Payment.findOneAndRemove({
            _id: id,
        });

        req.flash('alertMessage', 'Berhasil menghapus payment');
        req.flash('alertStatus', 'success');

        res.redirect('/payment');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
        next(error);
    }
};

module.exports = {
    index,
    createView,
    actionCreate,
    viewEdit,
    actionEdit,
    actionDelete,
};