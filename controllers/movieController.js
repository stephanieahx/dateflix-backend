const movieRepository = require('../repositories/movieRepository');
// const sessionController = require('./sessionController')
const db = require('../db');
const { getAll } = require('../repositories/movieRepository');

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

};
