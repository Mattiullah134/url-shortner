const express = require('express');
const { handleGenerateShortUrl, handleGetAnaltics } = require('../controllers/url');
const router = express.Router();


router.post('/', handleGenerateShortUrl);
router.get('/analytics/:shortid', handleGetAnaltics)
module.exports = router;