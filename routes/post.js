'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');

const router = express.Router();
// this prevents unauthorized user to access endpoint
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.post('/', (req,res) => {
    console.log(req.params);
    res.json('hello');
});

module.exports = router;