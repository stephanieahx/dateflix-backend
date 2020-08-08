// Dependencies
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const db = require('./db');

// Environment Variables
const mongoURI = 'mongodb://localhost:27017/Dateflix'; // process.env.MONGODB_CONNECTION_STRING ||
const PORT = process.env.PORT || 3000;

db.connect();

// Connect to Mongo 
mongoose.connect(mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('MongoDB connection established')
);

// Middleware
app.use(session({
    secret: process.env.SECRET || "applesauce",
    resave: false,
    saveUninitialized: false,
}));
app.use(express.json()); // returns middleware that only parses JSON
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
const movieController = require('./controllers/movieController.js');
// app.get('/movies', movieController);

require('./routes')(app);

app.listen(PORT, () => {
    console.log('Now listening on port', PORT);
});
