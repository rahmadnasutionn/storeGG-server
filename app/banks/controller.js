const Bank = require('./model');

const index = async(req, res, next) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');

        const alert = {
            message: alertMessage,
            status: alertStatus,
        };
        const bank = await Bank.find();
        res.render('admin/bank/view_bank', {
            bank,
            alert,
            name: req.session.user.name,
            title: 'Halaman dashboard',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
        next(error);
    }
};

const createView = async(req, res, next) => {
    try {
        res.render('admin/bank/create', {
            name: req.session.user.name,
            title: 'Halaman dashboard',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
        next(error);
    }
};

const viewEdit = async(req, res, next) => {
    try {
        const { id } = req.params;

        const bank = await Bank.findOne({
            _id: id,
        });

        res.render('admin/bank/edit', {
            bank,
            name: req.session.user.name,
            title: 'Halaman dashboard',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
        next(error);
    }
};

const actionCreate = async(req, res, next) => {
    try {
        const { name, nameBank, noRekening } = req.body;

        let bank = await Bank({ name, nameBank, noRekening });

        await bank.save();

        req.flash('alertMessage', 'Berhasil menambah bank');
        req.flash('alertStatus', 'success');

        res.redirect('/bank');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
        next(error);
    }
};

const actionEdit = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, nameBank, noRekening } = req.body;

        await Bank.findOneAndUpdate({
            _id: id,
        }, { name, nameBank, noRekening }, { new: true, runValidators: true });

        req.flash('alertMessage', 'Berhasil ubah bank');
        req.flash('alertStatus', 'success');

        res.redirect('/bank');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/bank');
        next(error);
    }
};

const actionDelete = async(req, res, next) => {
    try {
        const { id } = req.params;

        await Bank.findOneAndRemove({
            _id: id,
        });

        req.flash('alertMessage', 'Berhasil menghapus bank');
        req.flash('alertStatus', 'success');

        res.redirect('/bank');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
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