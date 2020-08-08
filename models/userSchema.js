const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    age: Number,
    gender: String,
    favMovies: {}
});

mongoose.model('users', userSchema)