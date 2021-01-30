'use strict';
//will prob update to use async await

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');
const Post = require('../models/post');

const router = express.Router();
// this prevents unauthorized user to access endpoint


router.get('/', (req,res) =>{
    Post
        .find({})
        .then(result => {
            res.json(result);
        })
});

//it will use limit and skip along 
// this will return the amount of documents that it needs 
//for now it will just load all the posts
//allarticles
router.get('/allarticles', (req, res, next) => {
    console.log('passed the if statement djskad jkhsah DHJK ASHJK DHJKG SADHJK kjh dasJKH das JHK');
    Post
        .find()
        .then(result => {
           res.json(result); 
        })
        .catch(error => next(error));
});

router.get('/:title', (req,res, next) => {
    let {title} = req.params;
    Post
        .find({title: title})
        .then(result => {
            res.json(result);
        })
        .catch(error => next(error));
});

router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.post('/', (req,res) => {
    let object = {...req.body};
    console.log(object);
    Post
        .create(object)
        .then(result => {
            res.status(201)
            .json({
                outcome: 'it has been created',
                result
            })
        })
        .catch(e => next(e))

});

module.exports = router;