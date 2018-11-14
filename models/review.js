const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movietitle: String
})

module.exports = Review
