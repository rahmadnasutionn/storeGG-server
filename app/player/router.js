const express = require('express');
const router = express.Router();
const { landingPage } = require('./controller');

router.get('/landingPage', landingPage);

module.exports = router;