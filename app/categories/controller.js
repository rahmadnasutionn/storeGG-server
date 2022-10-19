const Category = require('./model');

const index = async(req, res, next) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');

        const alert = {
            message: alertMessage,
            status: alertStatus,
        };
        const category = await Category.find();
        res.render('admin/category/view_category', {
            category,
            alert,
            name: req.session.user.name,
            title: 'Halaman dashboard',
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
        res.render('admin/category/create', {
            name: req.session.user.name,
            title: 'Halaman dashboard',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/category');
        next(error);
    }
};

const viewEdit = async(req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findOne({
            _id: id,
        });

        res.render('admin/category/edit', {
            category,
            name: req.session.user.name,
            title: 'Halaman dashboard',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/category');
        next(error);
    }
};

const actionCreate = async(req, res, next) => {
    try {
        const { name } = req.body;

        let category = await Category({ name });

        await category.save();

        req.flash('alertMessage', 'Berhasil menambah category');
        req.flash('alertStatus', 'success');

        res.redirect('/category');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/category');
        next(error);
    }
};

const actionEdit = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        await Category.findOneAndUpdate({
            _id: id,
        }, { name }, { new: true, runValidators: true });

        req.flash('alertMessage', 'Berhasil ubah category');
        req.flash('alertStatus', 'success');

        res.redirect('/category');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/category');
        next(error);
    }
};

const actionDelete = async(req, res, next) => {
    try {
        const { id } = req.params;

        await Category.findOneAndRemove({
            _id: id,
        });

        req.flash('alertMessage', 'Berhasil menghapus category');
        req.flash('alertStatus', 'success');

        res.redirect('/category');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        req.redirect('/category');
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