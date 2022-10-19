const express = require('express');
const router = express.Router();
const { index, createView, actionCreate, viewEdit, actionEdit, actionDelete, actionStatus } = require('./controller');
const multer = require('multer');
const os = require('os');
const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.get('/create', createView);
router.post('/create', multer({ dest: os.tmpdir() }).single('image'), actionCreate);
router.get('/edit/:id', multer({ dest: os.tmpdir() }).single('image'), viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);
router.put('/status/:id', actionStatus);

module.exports = router;