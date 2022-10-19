const express = require('express');
const router = express.Router();
const { index, createView, actionCreate, viewEdit, actionEdit, actionDelete } = require('./controller');

const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.get('/create', createView);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;