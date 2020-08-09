const movieRepository = require('../repositories/movieRepository');
// const sessionController = require('./sessionController')
const db = require('../db');
// const { getAll } = require('../repositories/movieRepository');

const fetch = require('node-fetch');
const accessKey = process.env.ACCESS_KEY;
const url = 'http://www.omdbapi.com/?apikey=' + accessKey


module.exports = {

    // Add movie to dateflix movie database collection when users add it to their favourites
    async create(req, res) {
        try {
            await movieRepository.create(req.body);
            res.json('Movie added to datelix database successfully.');
        } catch (err) {
            // res.json('errors/404', { err });
            res.json({ err });
        }
    },

    // View all movies as posters (only movies that have been added to favourites by users)
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

    // API FETCH - Find movie by query 
    async fetchOMDBdata(req, res) {
        const response = await fetch(url + '&t=' + req.params.body.title);
        const result = await response.json();
        console.log(result);
        res.json(result)

    },

};
