const User = require('./model');
const bcrypt = require('bcryptjs');

const viewSignin = async(req, res, next) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');

        const alert = {
            message: alertMessage,
            status: alertStatus,
        };
        if (req.session.user === null || req.session.user === undefined) {
            res.render('admin/users/view_signin', {
                alert,
                title: 'Halaman signin',
            });
        } else {
            res.redirect('/dashboard');
        }
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
        next(error);
    }
};

const actionSignin = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const check = await User.findOne({
            email,
        });

        if (check) {
            if (check.status === 'Y') {
                const checkPassword = await bcrypt.compare(password, check.password);
                if (checkPassword) {
                    req.session.user = {
                        id: check._id,
                        email: check.email,
                        status: check.status,
                        name: check.name,
                    };
                    res.redirect('/dashboard');
                } else {
                    req.flash('alertMessage', 'Password anda salah');
                    req.flash('alertStatus', 'danger');
                    res.redirect('/');
                }
            } else {
                req.flash('alertMessage', 'Mohon maaf status anda belom aktif');
                req.flash('alertStatus', 'danger');
                res.redirect('/');
            }
        }
    } catch (error) {
        req.flash('alertMessage', 'Email yang anda masukkan tidak tepat');
        req.flash('alertStatus', 'danger');
        res.redirect('/');
        next(error);
    }
};

const actionLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = {
    viewSignin,
    actionSignin,
    actionLogout,
};