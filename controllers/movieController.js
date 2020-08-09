const movieRepository = require('../repositories/movieRepository');
// const sessionController = require('./sessionController')
const db = require('../db');
// const { getAll } = require('../repositories/movieRepository');

const fetch = require('node-fetch');
const accessKey = process.env.ACCESS_KEY;
const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=' + accessKey

module.exports = {
    // View all movies as posters
    async getAll(req, res) {
        const movies = await movieRepository.getAll();
        res.json(movies);
    },

    // View information of selected movie
    async viewOneSelected(req, res) {
        const movie = await movieRepository.getOneById(req.params.id);
        res.json(movie);
    },
    
    // Find movie by title * NOT WORKING *
    async viewOneByTitle(req, res) {
        const movie = await movieRepository.findOneByTitle(req.params.body.title);
        res.json(movie);
    },

    // API FETCH
    async fetchOMDBdata(req, res) {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        res.json(result)

    },

};
