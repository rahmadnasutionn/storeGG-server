const express = require('express');
const router = express.Router();
const { signup } = require('./controller');
const os = require('os');
const multer = require('multer');

router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signup);

module.exports = router;