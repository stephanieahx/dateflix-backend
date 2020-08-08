const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    age: Number,
    gender: String,
    favMovies: {}
});

mongoose.model('users', userSchema)