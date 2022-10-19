const Nominal = require('./model');

const index = async(req, res, next) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');

        const alert = {
            message: alertMessage,
            status: alertStatus,
        };
        const nominal = await Nominal.find();
        res.render('admin/nominal/view_nominal', {
            nominal,
            alert,
            name: req.session.user.name,
            title: 'Halaman Nominal',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/category');
        next(error);
    }
};

const createView = async(req, res, next) => {
    try {
        res.render('admin/nominal/create', {
            name: req.session.user.name,
            title: 'Halaman tambah nominals',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/nominal');
        next(error);
    }
};

const viewEdit = async(req, res, next) => {
    try {
        const { id } = req.params;

        const nominal = await Nominal.findOne({
            _id: id,
        });

        res.render('admin/nominal/edit', {
            nominal,
            name: req.session.user.name,
            title: 'Halaman ubah nominal',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/nominal');
        next(error);
    }
};

const actionCreate = async(req, res, next) => {
    try {
        const { coinName, coinQuantity, price } = req.body;

        let nominal = await Nominal({ coinName, coinQuantity, price });

        await nominal.save();

        req.flash('alertMessage', 'Berhasil menambah nominal');
        req.flash('alertStatus', 'success');

        res.redirect('/nominal');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/nominal');
        next(error);
    }
};

const actionEdit = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { coinName, coinQuantity, price } = req.body;

        await Nominal.findOneAndUpdate({
            _id: id,
        }, { coinName, coinQuantity, price }, { new: true, runValidators: true });

        req.flash('alertMessage', 'Berhasil ubah nominal');
        req.flash('alertStatus', 'success');

        res.redirect('/nominal');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/nominal');
        next(error);
    }
};

const actionDelete = async(req, res, next) => {
    try {
        const { id } = req.params;

        await Nominal.findOneAndRemove({
            _id: id,
        });

        req.flash('alertMessage', 'Berhasil menghapus nominal');
        req.flash('alertStatus', 'success');

        res.redirect('/nominal');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/nominal');
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