const movieRepository = require('../repositories/movieRepository');
// const sessionController = require('./sessionController')
const db = require('../db');
// const { getAll } = require('../repositories/movieRepository');

const fetch = require('node-fetch');
const accessKey = process.env.TMDB_ACCESS_KEY;
const url = 'https://api.themoviedb.org/3/movie/popular?' + 'api_key=' + accessKey + '&language=en-US&page=1' 

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

    // View all popular movies from TMDB
    async getAllTMDB(req, res) {
        const response = await fetch(url);
        const result = await response.json();
        const movieListTMDB = result.results; 
        res.json(movieListTMDB);
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
        console.log(req.params.title)
        console.log("body below")
        console.log(req.body)
        const response = await fetch(url + '&t=' + req.body.title);
        const result = await response.json();
        res.json(result)

    },

};
