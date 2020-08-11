const movieRepository = require('../repositories/movieRepository');
const db = require('../db');

// Stuff for TMDB API fetch
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

    // View all favourite movies
    async viewAll(req, res) {
        const favMovies = await movieRepository.getAll();
        res.json(favMovies)
    },

    // View information of selected movie
    async viewOneSelected(req, res) {
        const movie = await movieRepository.getOneById(req.params.id);
        res.json(movie);
    },

    // Delete movie from Dateflix database
    async delete(req, res) {
        try {
            const id = await movieRepository.delete(req.params.id);
            res.json('Deleted movie from favourites.');
        } catch (err) {
            console.log('error', err);
        }
    },


    // Find movie by title * NOT WORKING *
    async viewOneByTitle(req, res) {
        const movie = await movieRepository.findOneByTitle(req.params.body.title);
        res.json(movie);
    },

};
