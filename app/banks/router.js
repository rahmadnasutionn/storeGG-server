const express = require('express');
const router = express.Router();
const { index, createView, actionCreate, viewEdit, actionEdit, actionDelete } = require('./controller');

/* GET home page. */
router.get('/', index);
router.get('/create', createView);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;