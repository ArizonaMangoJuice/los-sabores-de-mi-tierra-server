'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { API_URL } = require('../config');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');

const router = express.Router();
//this will bring the images saved from the recipe site

router.get('/images/:imageurl', (req,res) => {
    let {imageurl} = req.params;
    console.log(req.params)
    console.log(imageurl);
    res.json({imageurl});
});

module.exports = router;