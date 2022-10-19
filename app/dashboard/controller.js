const index = async(req, res, next) => {
    try {
        res.render('index', {
            name: req.session.user.name,
            title: 'Halaman dashboard',
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    index,
};