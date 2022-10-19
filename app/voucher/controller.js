const Voucher = require('./model');
const Category = require('../categories/model');
const Nominal = require('../nominals/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

const index = async(req, res, next) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');

        const alert = {
            message: alertMessage,
            status: alertStatus,
        };
        const voucher = await Voucher.find().populate('category').populate('nominals');
        res.render('admin/voucher/view_voucher', {
            voucher,
            alert,
            name: req.session.user.name,
            title: 'Halaman dashboard',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/voucher');
        next(error);
    }
};

const createView = async(req, res, next) => {
    try {
        const category = await Category.find();
        const nominal = await Nominal.find();
        res.render('admin/voucher/create', {
            category,
            nominal,
            name: req.session.user.name,
            title: 'Halaman tambah voucher',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/voucher');
        next(error);
    }
};

const viewEdit = async(req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.find();
        const nominal = await Nominal.find();
        const voucher = await Voucher.findOne({
                _id: id,
            })
            .populate('category')
            .populate('nominals');

        res.render('admin/voucher/edit', {
            voucher,
            category,
            nominal,
            name: req.session.user.name,
            title: 'Halaman ubah Voucher',
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/voucher');
        next(error);
    }
};

const actionCreate = async(req, res, next) => {
    try {
        const { nominals, category, name } = req.body;

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);

            src.pipe(dest);

            src.on('end', async() => {
                try {
                    const voucher = new Voucher({
                        name,
                        category,
                        nominals,
                        thumbnail: filename,
                    });

                    await voucher.save();
                    req.flash('alertMessage', 'Berhasil tambah voucher');
                    req.flash('alertStatus', 'danger');
                    res.redirect('/voucher');
                } catch (error) {
                    req.flash('alertMessage', `${error.message}`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/voucher');
                }
            });
        } else {
            const voucher = new Voucher({
                name,
                category,
                nominals,
            });

            await voucher.save();
            req.flash('alertMessage', 'Berhasil tambah voucher');
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/voucher');
        next(error);
    }
};

const actionEdit = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { nominals, category, name } = req.body;

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);

            src.pipe(dest);

            src.on('end', async() => {
                try {
                    let voucher = await Voucher.findOne({
                        _id: id,
                    });

                    let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage);
                    }

                    await Voucher.findOneAndUpdate({ _id: id }, { name, category, nominals, thumbnail: filename }, { new: true, runValidators: true });

                    req.flash('alertMessage', 'Berhasil tambah voucher');
                    req.flash('alertStatus', 'danger');
                    res.redirect('/voucher');
                } catch (error) {
                    req.flash('alertMessage', `${error.message}`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/voucher');
                }
            });
        } else {
            await Voucher.findOneAndUpdate({
                _id: id,
            }, {
                name,
                category,
                nominals,
            }, { new: true, runValidators: true });

            req.flash('alertMessage', 'Berhasil ubah voucher');
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
        }
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/voucher');
        next(error);
    }
};

const actionDelete = async(req, res, next) => {
    try {
        const { id } = req.params;

        const voucher = await Voucher.findOneAndRemove({
            _id: id,
        });

        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }

        req.flash('alertMessage', 'Berhasil menghapus voucher');
        req.flash('alertStatus', 'success');

        res.redirect('/voucher');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/voucher');
        next(error);
    }
};

const actionStatus = async(req, res, next) => {
    try {
        const { id } = req.params;
        let voucher = await Voucher.findOne({ _id: id });

        let status = voucher.status === 'Y' ? 'N' : 'Y';
        req.flash('alertMessage', 'Berhasil ubah status');
        req.flash('alertStatus', 'success');

        voucher = await Voucher.findOneAndUpdate({
            _id: id,
        }, { status }, { new: true, runValidators: true });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/voucher');
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
    actionStatus,
};