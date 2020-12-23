'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { API_URL } = require('../config');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');

const router = express.Router();

router.get('/images/:imageurl', (req,res) => {
    let {imageUrl} = req.params;
    res.json({imageUrl});
});

module.exports = router;