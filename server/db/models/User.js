var mongoose = require('mongoose');

var Users = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    age: {
        type: Number,
    }
});

module.exports = {Users};