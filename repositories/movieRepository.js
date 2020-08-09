const db = require('../db');
const { ObjectId } = require('mongodb');

// const { default: fetch } = require('node-fetch');
const fetch = require('node-fetch');
const accessKey = process.env.TMDB_ACCESS_KEY;
const url = 'https://api.themoviedb.org/3/movie/popular?' + 'api_key=' + accessKey + '&language=en-US&page=1'

module.exports = {
    // Add movie to dateflix database
    async create(data) {
        try {
            const { insertedCount } = await db.movies.insertOne(data);
            if (!insertedCount) throw new Error('insertion failure');
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item ${JSON.stringify}`)
        }
    },

    // // View all movies from dateflix database as posters 
    // async getAll() {
    //     // all movie data
    //     const allMovieData = await db.movies.find().toArray();

    //     // // * TO REMOVE * RETURN ALL MOVIE DATA
    //     // // return allMovieData;
    //     console.log(allMovieData[0].Poster);
    //     console.log(allMovieData[0]._id);
    //     console.log(allMovieData[0].Title);

    //     // // Get Title, _id and Poster key-value pairs
    //     let movieList = [];
    //     for (let i = 0; i < allMovieData.length; i++) { // sequence matters 
    //         let movieData = {
    //             "_id": allMovieData[i]._id,
    //             "Poster": allMovieData[i].Poster,
    //             "Title": allMovieData[i].Title,
    //         };
    //         console.log(movieData);
    //         movieList.push(movieData);
    //     }
    //     console.log(movieList);
    //     return movieList;

    // },

    // View all popular movies from TMDB
    async getAllTMDB(req, res) {
        const response = await fetch(url);
        const result = await response.json().results;
        res.json(result);

    },

    // View info of selected movie
    async getOneById(id) {
        const result = await db.movies.findOne(
            {
                "_id": ObjectId(id)
            }
        );
        return result;
    },


}