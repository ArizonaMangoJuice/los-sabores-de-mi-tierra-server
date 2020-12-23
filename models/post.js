'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    images: [{imageUrl, date, altText}],
    title: String,
    ingredients: [[String]],
    description: [{pNumber: Number, text: String}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        likes: {likes: Number, default: 0}
    }
});

postSchema.set('toObject', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Post', postSchema);