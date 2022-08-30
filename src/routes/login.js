const express = require('express');
const crypto = require('crypto');
const emailValidation = require('../middleware/emailValidation');
const passwordlValidation = require('../middleware/passwordlValidation');

const router = express.Router();

router.post('/', emailValidation, passwordlValidation, async (_req, res) => {
    const key = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token: key });
});

module.exports = router;